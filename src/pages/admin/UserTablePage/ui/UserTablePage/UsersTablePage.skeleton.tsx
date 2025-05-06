import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TableSkeleton } from '@/shared/ui/Table';

import styles from './UsersTablePage.module.css';

// TODO add pagination and searchSection skeletons
export const UsersTablePageSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<Card className={styles.content}>
				<TableSkeleton columnCount={3} hasSelectors={false} />
			</Card>
		</Flex>
	);
};
