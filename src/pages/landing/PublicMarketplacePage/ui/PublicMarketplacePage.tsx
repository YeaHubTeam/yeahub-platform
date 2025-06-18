import { useModal, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Text } from '@/shared/ui/Text';
import { toast } from '@/shared/ui/Toast';

import { MarketplaceList } from '@/widgets/Marketplace';

import styles from './PublicMarketplacePage.module.css';

const PublicMarketplacePage = () => {
	const { isOpen, onToggle, onClose } = useModal();
	const { isMobile, isTablet } = useScreenSize();

	// заглушка для фильтров
	const renderFilters = () => <div>Фильтры (заглушка)</div>;

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
		<span
			role="button"
			tabIndex={0}
			className={styles.suggest}
			onClick={() => toast.success('Фича в разработке')}
			onKeyDown={(e) => e.key === 'Enter' && toast.success('Фича в разработке')}
		>
			Предложить свой
			<Icon icon="plus" color="purple-700" />
		</span>
	);

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<Flex className={styles.header}>
					<Text variant="head1" className={styles.title}>
						Полезные IT-ресурсы
					</Text>
					<div className={styles.actions}>
						{(isMobile || isTablet) && filterButton}
						{suggestButton}
					</div>
				</Flex>
				{/* список ресурсов: пока пустышка */}
				<MarketplaceList />

				{/* бургер виден только при ширине ≤ 1023 px */}
			</Card>

			{/* правый сайдбар с фильтрами — только десктоп */}
			{!isMobile && !isTablet && <Card className={styles.filters}>{renderFilters()}</Card>}
		</Flex>
	);
};

export default PublicMarketplacePage;
