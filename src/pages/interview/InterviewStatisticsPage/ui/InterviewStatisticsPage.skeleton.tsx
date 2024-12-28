import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './InterviewStatisticsPage.module.css';

export const InterviewStatisticsPageSkeleton = () => {
	return (
		<div className={styles.container}>
			<Card className={styles['interview-statistics']}>
				<Flex direction="column" align="center" className={styles.attempt}>
					<Skeleton width="100%" height={30} />
					<Flex direction="row" gap="32" align="center">
						<Skeleton
							width="clamp(180px, 12vw, 300px)"
							height="clamp(180px, 12vw, 300px)"
							borderRadius="50%"
						/>
						<Flex direction="column" gap="40" align="center">
							{[...Array(3)].map((_, i) => (
								<Flex key={i} direction="row" gap="8" align="center">
									<Skeleton height="35px" width={12} />
									<Flex direction="column" gap="4" align="center">
										<Skeleton height={17} width={100} />
										<Skeleton height={17} width={100} />
									</Flex>
								</Flex>
							))}
						</Flex>
					</Flex>
				</Flex>
			</Card>

			<Card className={styles.block}>
				<div className={styles.questions}>
					<Skeleton width={'80%'} height={40} />
					<Skeleton
						width="clamp(180px, 12vw, 300px)"
						height="clamp(180px, 12vw, 300px)"
						borderRadius="50%"
					/>
					<Flex justify="between" gap="12">
						{[...Array(4)].map((_, i) => (
							<Card key={i} className={styles.stats}>
								<Skeleton width="88%" height={17} style={{ marginBottom: 12 }} />
								<Skeleton width="88%" height={17} />
							</Card>
						))}
					</Flex>
				</div>
			</Card>

			<Card className={styles['history-list']}>
				<Flex direction="column" align="center" style={{ marginTop: 20 }}>
					<Skeleton width="90%" height={70} style={{ marginBottom: 24 }} />
					{[...Array(3)].map((_, i) => (
						<Skeleton key={i} width="80%" height={80} style={{ marginBottom: 12 }} />
					))}
				</Flex>
			</Card>

			<Card className={styles.category}>
				<div>
					<Skeleton width="30%" height={30} style={{ marginBottom: 16 }} />
					{[...Array(6)].map((_, i) => (
						<Flex key={i} gap="16" align="center">
							<Skeleton width="100%" height={40} />
						</Flex>
					))}
				</div>
			</Card>
		</div>
	);
};
