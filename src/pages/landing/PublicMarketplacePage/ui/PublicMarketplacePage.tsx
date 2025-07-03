import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { useModal, useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Text } from '@/shared/ui/Text';
import { toast } from '@/shared/ui/Toast';

import { useGetResourcesListQuery } from '@/entities/resource';

import {
	ResourcesList,
	MarketplaceFiltersPanel,
	useMarketplaceFilters,
	ResourcesPagination,
} from '@/widgets/Marketplace';

import styles from './PublicMarketplacePage.module.css';

const RESOURCES_PER_PAGE = 6;

const PublicMarketplacePage = () => {
	const { isOpen, onToggle, onClose } = useModal();
	const { isMobile, isTablet } = useScreenSize();
	const {
		onChangeSearchParams,
		onChangeSkills,
		onChangeSpecialization,
		onChangeResources,
		onChangeStatus,
		filter,
		onChangePage,
	} = useMarketplaceFilters();

	const {
		data: resourcesResponse,
		isFetching,
		error,
	} = useGetResourcesListQuery({
		page: filter.page ?? 1,
		limit: RESOURCES_PER_PAGE,
		name: filter.title,
	});

	const resources = resourcesResponse?.data ?? [];

	const { t } = useTranslation(i18Namespace.marketplace);

	if (isFetching && !resourcesResponse) {
		return <div>Loading…</div>;
	}

	if (error) {
		return <div>Не удалось загрузить ресурсы</div>;
	}

	const renderFilters = () => (
		<MarketplaceFiltersPanel
			filter={{
				skills: filter.skills,
				status: filter.status,
			}}
			onChangeSearch={onChangeSearchParams}
			onChangeSkills={onChangeSkills}
			onChangeSpecialization={onChangeSpecialization}
			onChangeStatus={onChangeStatus}
			onChangeResources={onChangeResources}
		/>
	);

	// бургер-кнопка + дровер (нужны лишь на мобилках/планшетах)
	const filterButton = (
		<div className={styles['filters-mobile']}>
			<IconButton
				className={styles['filters-mobile-button']}
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

	const suggestButton = (
		<Button
			variant="link-purple"
			suffix={<Icon icon="plus" />}
			onClick={() => toast.success('Фича в разработке')}
		>
			{t(Marketplace.LINK_LABEL)}
		</Button>
	);

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<Flex className={styles.header}>
					<Text variant="body6" isMainTitle>
						{t(Marketplace.HEADER_TITLE)}
					</Text>
					<Flex gap="12" align="center">
						{(isMobile || isTablet) && filterButton}
						{suggestButton}
					</Flex>
				</Flex>
				<ResourcesList resources={resources} />

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

export default PublicMarketplacePage;
