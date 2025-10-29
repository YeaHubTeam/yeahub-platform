import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetResourcesListQuery, useResourcesFilters } from '@/entities/resource';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { ResourcesList, ResourcesPagination } from '@/widgets/Marketplace';
import { ResourcesFilters } from '@/widgets/resources/ResourcesFilters';

import styles from './PublicResourcesPage.module.css';
import { PublicResourcesPageSkeleton } from './PublicResourcesPage.skeleton';

const PublicResourcesPage = () => {
	const { isMobile, isTablet } = useScreenSize();

	const {
		onChangeTitle,
		onChangeSkills,
		onChangeSpecialization,
		onChangeTypes,
		filters,
		onChangePage,
		onResetFilters,
	} = useResourcesFilters({ page: 1, specialization: DEFAULT_SPECIALIZATION_ID });

	const {
		data: resourcesResponse,
		isLoading,
		error,
	} = useGetResourcesListQuery({
		page: filters.page ?? 1,
		name: filters.title,
		specializations: filters.specialization,
		skills: filters.skills,
		types: filters.types,
	});

	const resources = resourcesResponse?.data ?? [];

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

	if (isLoading) {
		return <PublicResourcesPageSkeleton />;
	}

	if (error) {
		return <div>Не удалось загрузить ресурсы</div>;
	}

	return (
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

			{!isMobile && !isTablet && <Card className={styles.filters}>{renderFilters()}</Card>}
		</Flex>
	);
};

export default PublicResourcesPage;
