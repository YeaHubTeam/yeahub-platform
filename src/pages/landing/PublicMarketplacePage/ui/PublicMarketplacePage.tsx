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

import { MarketplaceList } from '@/widgets/Marketplace';

import styles from './PublicMarketplacePage.module.css';

const PublicMarketplacePage = () => {
	const { isOpen, onToggle, onClose } = useModal();
	const { isMobile, isTablet } = useScreenSize();

	const { t } = useTranslation(i18Namespace.marketplace);

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
		<Button
			variant="link-purple"
			suffix={<Icon icon="plus" />} // сюда «внёс» вашу иконку
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
