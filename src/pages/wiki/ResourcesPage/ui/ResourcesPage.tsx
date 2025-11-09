import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector, useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { getIsEmailVerified, getSpecializationId } from '@/entities/profile';
import {
	useGetMyRequestsResourcesReviewCountQuery,
	useGetResourcesListQuery,
} from '@/entities/resource';

import { ResourcesFilters, useResourcesFilters } from '@/features/resources/filterResources';

import { ResourcesList, ResourcesPagination } from '@/widgets/Marketplace';

import styles from './ResourcesPage.module.css';
import { ResourcesPageSkeleton } from './ResourcesPageSkeleton.skeleton';

const ResourcesPage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const navigate = useNavigate();
	const specializationId = useSelector(getSpecializationId);
	const isEmailVerified = useAppSelector(getIsEmailVerified);

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

				{resources.length > 0 ? (
					<ResourcesList resources={resources} />
				) : (
					<EmptyFilterStub resetFilters={onResetFilters} />
				)}

				<ResourcesPagination
					resourcesResponse={resourcesResponse}
					currentPage={filters.page ?? 1}
					onChangePage={onChangePage}
				/>
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
