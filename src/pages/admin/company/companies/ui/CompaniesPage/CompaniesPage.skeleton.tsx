import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TableSkeleton } from '@/shared/ui/Table';

import styles from './CompaniesPage.module.css';

export const CompaniesPageSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<Card className={styles.content}>
				<TableSkeleton columnCount={4} hasAction={false} hasCopyButton />
			</Card>
		</Flex>
	);
};
