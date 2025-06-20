import { useModal, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { MarketplaceFiltersPanel, useMarketplaceFilters } from '@/widgets/Marketplace';

import styles from './PublicMarketplacePage.module.css';

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
	} = useMarketplaceFilters();

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

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				{/* список ресурсов: пока пустышка */}
				<div style={{ minHeight: 200 }}>Список ресурсов (заглушка)</div>

				{/* бургер виден только при ширине ≤ 1023 px */}
				{(isMobile || isTablet) && filterButton}
			</Card>

			{!isMobile && !isTablet && <Card className={styles.filters}>{renderFilters()}</Card>}
		</Flex>
	);
};

export default PublicMarketplacePage;
