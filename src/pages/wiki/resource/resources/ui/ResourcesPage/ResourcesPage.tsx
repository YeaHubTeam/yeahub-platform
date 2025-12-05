import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Marketplace, ROUTES } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Stub } from '@/shared/ui/Stub';
import { TablePagination } from '@/shared/ui/TablePagination';
import { Text } from '@/shared/ui/Text';

import { getIsVerified, getSpecializationId } from '@/entities/profile';
import {
	useGetMyRequestsResourcesReviewCountQuery,
	useGetResourcesListQuery,
} from '@/entities/resource';

import { ResourcesFilters, useResourcesFilters } from '@/features/resources/filterResources';

import { ResourcesList } from '@/widgets/Marketplace';

import styles from './ResourcesPage.module.css';
import { ResourcesPageSkeleton } from './ResourcesPage.skeleton';

const ResourcesPage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const navigate = useNavigate();
	const specializationId = useSelector(getSpecializationId);
	const isEmailVerified = useAppSelector(getIsVerified);

	const { onChangeTitle, onChangeSkills, onChangeTypes, filters, onChangePage, onResetFilters } =
		useResourcesFilters({ page: 1 });

	const {
		data: resourcesResponse,
		isLoading,
		error,
	} = useGetResourcesListQuery({
		page: filters.page ?? 1,
		name: filters.title,
		specializations: specializationId,
		skills: filters.skills,
		types: filters.types,
	});
	const { data: myResourceRequestsReviewCount = 0 } = useGetMyRequestsResourcesReviewCountQuery({});

	const resources = resourcesResponse?.data ?? [];

	const { t } = useTranslation(i18Namespace.marketplace);

	const handleNavigateToMyResources = () => {
		navigate(ROUTES.wiki.resources.my.page);
	};

	if (isLoading) {
		return <ResourcesPageSkeleton />;
	}

	if (error) {
		return <div>Не удалось загрузить ресурсы</div>;
	}

	const renderFilters = () => (
		<ResourcesFilters
			filters={{
				skills: filters.skills,
				types: filters.types,
				title: filters.title,
			}}
			onChangeTitle={onChangeTitle}
			onChangeSkills={onChangeSkills}
			onChangeTypes={onChangeTypes}
			showSpecialization={false}
		/>
	);

	const suggestButton = (
		<Button
			variant="link-purple"
			suffix={<Icon icon="plus" />}
			onClick={() => navigate(ROUTES.wiki.resources.my.create.page)}
		>
			{t(Marketplace.LINK_LABEL)}
		</Button>
	);

	return (
		<Flex gap="20" align="start" style={{ position: 'relative' }}>
			<Card className={styles.main}>
				<Flex className={styles.header}>
					<Text variant="body6" isMainTitle>
						{t(Marketplace.HEADER_TITLE)}
					</Text>
					<Flex gap="12" align="center">
						{(isMobile || isTablet) && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
						{isEmailVerified && suggestButton}
					</Flex>
				</Flex>
				{resourcesResponse ? (
					<>
						<ResourcesList resources={resources} />
						<TablePagination
							page={filters.page || 1}
							onChangePage={onChangePage}
							limit={resourcesResponse.limit}
							total={resourcesResponse.total}
						/>
					</>
				) : (
					<Stub type={'filter-empty'} onClick={onResetFilters} />
				)}
			</Card>
			{isEmailVerified && (
				<Button
					className={styles['absolute-button']}
					variant="outline"
					size="large"
					onClick={handleNavigateToMyResources}
				>
					{t(Marketplace.MY_RESOURCES)}{' '}
					{myResourceRequestsReviewCount > 0 ? `(${myResourceRequestsReviewCount})` : ''}
				</Button>
			)}

			<Card className={styles.filters}>{renderFilters()}</Card>
		</Flex>
	);
};

export default ResourcesPage;
