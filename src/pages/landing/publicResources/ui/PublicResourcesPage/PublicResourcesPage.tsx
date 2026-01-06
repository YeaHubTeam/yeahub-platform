import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Marketplace, Resources, ROUTES } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetResourcesListQuery } from '@/entities/resource';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { ResourcesFilters, useResourcesFilters } from '@/features/resources/filterResources';

import { ResourcesList } from '@/widgets/Marketplace';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import styles from './PublicResourcesPage.module.css';
import { PublicResourcesPageSkeleton } from './PublicResourcesPage.skeleton';

const PublicResourcesPage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const navigate = useNavigate();

	const {
		onChangeTitle,
		onChangeSkills,
		onChangeSpecialization,
		onChangeTypes,
		filters,
		onChangePage,
		onResetFilters,
		hasFilters,
	} = useResourcesFilters({ page: 1, specialization: DEFAULT_SPECIALIZATION_ID });

	const {
		data: resourcesResponse,
		isLoading,
		isError,
		refetch,
	} = useGetResourcesListQuery({
		page: filters.page ?? 1,
		name: filters.title,
		specializations: filters.specialization,
		skills: filters.skills,
		types: filters.types,
	});

	const resources = resourcesResponse?.data ?? [];
	const hasResources = resources.length > 0;

	const { t } = useTranslation(i18Namespace.marketplace);

	const renderFilters = () => (
		<ResourcesFilters
			filters={{
				skills: filters.skills,
				types: filters.types,
				specialization: filters.specialization,
				title: filters.title,
			}}
			onChangeTitle={onChangeTitle}
			onChangeSkills={onChangeSkills}
			onChangeSpecialization={onChangeSpecialization}
			onChangeTypes={onChangeTypes}
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
			isLoading={isLoading}
			hasError={isError}
			hasFilters={hasFilters}
			hasData={hasResources}
			skeleton={<PublicResourcesPageSkeleton />}
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
				<Flex gap="20" align="start">
					<Card className={styles.main}>
						<Flex className={styles.header}>
							<Text variant="body6" isMainTitle>
								{t(Marketplace.HEADER_TITLE)}
							</Text>
							<Flex gap="12" align="center">
								{(isMobile || isTablet) && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
							</Flex>
						</Flex>
						<>
							{content}
							{pagination}
						</>
					</Card>

					{!isMobile && !isTablet && <Card className={styles.filters}>{renderFilters()}</Card>}
				</Flex>
			)}
		</PageWrapper>
	);
};

export default PublicResourcesPage;
