import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Marketplace, Resources, ROUTES } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { getIsVerified, getSpecializationId } from '@/entities/profile';
import {
	useGetMyRequestsResourcesReviewCountQuery,
	useGetResourcesListQuery,
} from '@/entities/resource';

import { ResourcesFilters, useResourcesFilters } from '@/features/resources/filterResources';

import { ResourcesList } from '@/widgets/Marketplace';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import styles from './ResourcesPage.module.css';
import { ResourcesPageSkeleton } from './ResourcesPage.skeleton';

const ResourcesPage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const navigate = useNavigate();
	const specializationId = useSelector(getSpecializationId);
	const isEmailVerified = useAppSelector(getIsVerified);

	const {
		onChangeTitle,
		onChangeSkills,
		onChangeTypes,
		filters,
		onChangePage,
		onResetFilters,
		hasFilters,
	} = useResourcesFilters({ page: 1 });

	const {
		data: resourcesResponse,
		isLoading,
		isError,
		refetch,
	} = useGetResourcesListQuery({
		page: filters.page ?? 1,
		name: filters.title,
		specializations: specializationId,
		skills: filters.skills,
		types: filters.types,
	});
	const { data: myResourceRequestsReviewCount = 0 } = useGetMyRequestsResourcesReviewCountQuery({});

	const resources = resourcesResponse?.data ?? [];
	const hasResources = resources.length > 0;

	const { t } = useTranslation([i18Namespace.marketplace, i18Namespace.resources]);

	const handleNavigateToMyResources = () => {
		navigate(ROUTES.wiki.resources.my.page);
	};

	if (isLoading) {
		return <ResourcesPageSkeleton />;
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

	const stubs: PageWrapperStubs = {
		'filter-empty': {
			onClick: onResetFilters,
		},
		empty: {
			title: t(Resources.STUB_EMPTY_RESOURCES_TITLE, { ns: i18Namespace.resources }),
			subtitle: t(Resources.STUB_EMPTY_RESOURCES_SUBTITLE, { ns: i18Namespace.resources }),
			buttonText: t(Resources.STUB_EMPTY_RESOURCES_SUBMIT, { ns: i18Namespace.resources }),
			onClick: () => navigate(ROUTES.wiki.resources.my.create.page),
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			hasFilters={hasFilters}
			hasData={hasResources}
			hasError={isError}
			stubs={stubs}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: resourcesResponse?.limit || 0,
				total: resourcesResponse?.total || 0,
			}}
			content={<ResourcesList resources={resources} />}
		>
			{({ content, pagination }) => (
				<Flex gap="20" align="start" style={{ position: 'relative' }}>
					<Card className={styles.main}>
						<Flex className={styles.header}>
							<Text variant="body6" isMainTitle>
								{t(Marketplace.HEADER_TITLE)}
							</Text>
							<Flex gap="12" align="center">
								{(isMobile || isTablet) && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
								{isEmailVerified && (
									<Button
										variant="link-purple"
										suffix={<Icon icon="plus" />}
										onClick={() => navigate(ROUTES.wiki.resources.my.create.page)}
									>
										{t(Marketplace.LINK_LABEL)}
									</Button>
								)}
							</Flex>
						</Flex>
						<>
							{content}
							{pagination}
						</>
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
			)}
		</PageWrapper>
	);
};

export default ResourcesPage;
