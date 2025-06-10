import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import styles from './PublicMarketplacePage.module.css';

const PublicMarketplacePage = () => (
	<Flex gap="20" align="start" className={styles.wrapper}>
		{/* левая колонка со списком ресурсов */}
		<Card className={styles['list-placeholder']}>TODO: resources list placeholder</Card>

		{/* правая колонка с фильтрами */}
		<Card className={styles['filter-placeholder']}>TODO: filters placeholder</Card>
	</Flex>
);

export default PublicMarketplacePage;
