import { Block } from '@/shared/ui/Block';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './InterviewQuizResultPageWithSkeleton.module.css';
export const InterviewQuizResultPageWithSkeleton = () => {
	return (
		<div className={styles.container}>
			<Block>
				<Flex className={styles.result} align="center" gap="16" direction="column">
					<Skeleton width={'calc(100% - 200px)'} height={30} />
					<Flex direction="row" gap="16" align="center">
						<Skeleton className={styles.round} width={300} height={300} borderRadius={'50%'} />
						<Flex direction="column" gap="20" align="center">
							{[...Array(3)].map((_, i) => (
								<Skeleton key={i} height={35} width={300} />
							))}
						</Flex>
					</Flex>
				</Flex>
			</Block>
			<Flex direction="column" gap="16">
				<Block className={styles.block}>
					<Flex direction="column" gap="16" align="center">
						<Skeleton width={'calc(100% - 200px)'} height={30} />
						<Flex className={styles.progress}>
							<Skeleton className={styles.round} width={200} height={200} borderRadius={'50%'} />
						</Flex>
					</Flex>
				</Block>
				<Flex justify="between" gap="16">
					{[...Array(4)].map((_, i) => (
						<Block key={i}>
							<Skeleton width={70} height={30} />
						</Block>
					))}
				</Flex>
			</Flex>
			<Block className={styles.passed}>
				<div className={styles['passed-list']}>
					<Skeleton></Skeleton>
				</div>
			</Block>
		</div>
	);
};
