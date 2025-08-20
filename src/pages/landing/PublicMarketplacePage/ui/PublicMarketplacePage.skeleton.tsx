import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CollectionsContentSkeleton, CollectionsFilterPanelSkeleton } from '@/widgets/Collection';
import { ResourcesListSkeleton } from '@/widgets/Marketplace/ui/RecourcesList/ResourcesList.skeleton';
import { MarketplaceFiltersPanelSkeleton } from '@/widgets/Marketplace/ui/MarketplaceFiltersPanel/MarketplaceFiltersPanel.skeleton';
// Изменить как в Collection импорт

import styles from './PublicMarketplacePage.module.css';



export const PublicMarketplacePageSkeleton = () => {
	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
			<Flex className={styles.header}>
			</Flex>
			<ResourcesListSkeleton />
			pagination
			</Card>
			<MarketplaceFiltersPanelSkeleton /> 
		</Flex>
	);
};
