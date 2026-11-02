import { Flex } from '@/shared/ui/Flex';
import { PercentsInfoPieSkeleton } from '@/shared/ui/PercentsInfoPie';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './TestResultPage.module.css';

export const TestResultPageSkeleton = () => {
	return (
		<Flex gap="20" wrap="wrap" className={styles.container}>
			<Flex gap="20" wrap="wrap" maxWidth>
				<PercentsInfoPieSkeleton className={styles.questions} attemptStatsLength={2} />

				<Skeleton className={styles.test} height={360} borderRadius="16px" />
			</Flex>

			<Skeleton className={styles['questions-list']} height={450} borderRadius="16px" />
		</Flex>
	);
};
