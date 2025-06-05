import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import cls from './MarketplacePage.module.css';

const MarketplacePage = () => (
	<Flex gap="20" align="start" className={cls.wrapper}>
		{/* левая колонка со списком ресурсов */}
		<Card className={cls['list-placeholder']}>TODO: resources list placeholder</Card>

		{/* правая колонка с фильтрами */}
		<Card className={cls['filter-placeholder']}>TODO: filters placeholder</Card>
	</Flex>
);

export default MarketplacePage;
