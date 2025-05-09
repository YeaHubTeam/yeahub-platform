import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TableSkeleton } from '@/shared/ui/Table';

import styles from './CompaniesTablePage.module.css';

// TODO add pagination and searchSection skeletons
export const CompaniesTablePageSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<Card className={styles.content}>
				<TableSkeleton columnCount={2} />
			</Card>
		</Flex>
	);
};
