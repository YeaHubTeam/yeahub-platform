import { Block } from '@/shared/ui/Block';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './InterviewResultPage.module.css';
export const InterviewQuizResultPageSkeleton = () => {
	return (
		<div className={styles.container}>
			<Block className={styles.block}>
				<Flex direction="column" align="center" className={styles.result}>
					<Skeleton width="calc(100% - 200px)" height={30} />
					<Flex direction="row" gap="16" align="center">
						<Skeleton
							width="clamp(180px, 12vw, 300px)"
							height="clamp(180px, 12vw, 300px)"
							borderRadius="50%"
						/>
						<Flex direction="column" gap="20" align="center">
							{[...Array(3)].map((_, i) => (
								<Flex key={i} direction="row" gap="8" align="center">
									<Skeleton height={'35px'} width={12} />
									<Flex direction="column" gap="4" align="center">
										<Skeleton height={17} width={100} />
										<Skeleton height={17} width={100} />
									</Flex>
								</Flex>
							))}
						</Flex>
					</Flex>
				</Flex>
			</Block>
			<Flex direction="column" gap="16">
				<Block className={styles.block}>
					<Flex direction="column" gap="16" align="center">
						<Skeleton width={'calc(100% - 200px)'} height={30} />
						<Flex>
							<Skeleton
								width="clamp(150px, 10vw, 300px)"
								height="clamp(150px, 10vw, 300px)"
								borderRadius="50%"
							/>
						</Flex>
					</Flex>
				</Block>
				<Flex justify="between" gap="12">
					{[...Array(4)].map((_, i) => (
						<Block key={i} className={styles.stats}>
							<Skeleton width="88%" height={17} style={{ marginBottom: 12, flexGrow: 1 }} />
							<Skeleton width="88%" height={17} />
						</Block>
					))}
				</Flex>
			</Flex>
			<Block className={styles.passed}>
				<Flex direction="column" gap="16" align="center">
					<Skeleton width={'clamp(350px, 5vw, 600px)'} height={30} />
					<Flex gap="16" align="center" justify="between">
						<Skeleton width="12vw" />
						<Skeleton width="calc(50vw - 100px)" />
					</Flex>
				</Flex>
			</Block>
		</div>
	);
};
