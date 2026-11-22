import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TableSkeleton } from '@/shared/ui/Table';

import styles from './FeatureFlagsPage.module.css';

export const FeatureFlagsPageSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<Card className={styles.content}>
				<TableSkeleton columnCount={6} hasCopyButton />
			</Card>
		</Flex>
	);
};
