import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { useModal, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Text } from '@/shared/ui/Text';

import { useGetResourcesListQuery } from '@/entities/resource';

import {
	MarketplaceFiltersPanel,
	ResourcesList,
	ResourcesPagination,
	useMarketplaceFilters,
} from '@/widgets/Marketplace';

import styles from './PublicResourcesPage.module.css';
import { PublicResourcesPageSkeleton } from './PublicResourcesPage.skeleton';

const RESOURCES_PER_PAGE = 6;

const PublicResourcesPage = () => {
	const { isOpen, onToggle, onClose } = useModal();
	const { isMobile, isTablet } = useScreenSize();

	const {
		onChangeSearchParams,
		onChangeSkills,
		onChangeSpecialization,
		onChangeResources,
		filter,
		onChangePage,
		resetFilters,
	} = useMarketplaceFilters();

	const {
		data: resourcesResponse,
		isLoading,
		error,
	} = useGetResourcesListQuery({
		page: filter.page ?? 1,
		limit: RESOURCES_PER_PAGE,
		name: filter.title,
		specializations: filter.specialization,
		skills: filter.skills,
		types: filter.resources,
	});

	const resources = resourcesResponse?.data ?? [];

	const { t } = useTranslation(i18Namespace.marketplace);

	const renderFilters = () => (
		<MarketplaceFiltersPanel
			filter={{
				skills: filter.skills,
				resources: filter.resources,
				specialization: filter.specialization,
			}}
			onChangeSearch={onChangeSearchParams}
			onChangeSkills={onChangeSkills}
			onChangeSpecialization={onChangeSpecialization}
			onChangeResources={onChangeResources}
		/>
	);

	// бургер-кнопка + дровер (нужны лишь на мобилках/планшетах)
	const filterButton = (
		<div className={styles['filters-mobile']}>
			<IconButton
				aria-label="открыть фильтры"
				form="square"
				icon={<Icon icon="slidersHorizontal" color="black-700" />}
				size="small"
				variant="tertiary"
				onClick={onToggle}
			/>
			<Drawer
				rootName="body"
				isOpen={isOpen}
				onClose={onClose}
				className={styles.drawer}
				hasCloseButton
			>
				<Card className={styles['drawer-content']}>{renderFilters()}</Card>
			</Drawer>
		</div>
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
						{(isMobile || isTablet) && filterButton}
					</Flex>
				</Flex>

				{resources.length > 0 ? (
					<ResourcesList resources={resources} />
				) : (
					<EmptyFilterStub resetFilters={resetFilters} />
				)}

				<ResourcesPagination
					resourcesResponse={resourcesResponse}
					currentPage={filter.page ?? 1}
					onChangePage={onChangePage}
				/>
				{/* бургер виден только при ширине ≤ 1023 px */}
			</Card>

			{!isMobile && !isTablet && <Card className={styles.filters}>{renderFilters()}</Card>}
		</Flex>
	);
};

export default PublicResourcesPage;
