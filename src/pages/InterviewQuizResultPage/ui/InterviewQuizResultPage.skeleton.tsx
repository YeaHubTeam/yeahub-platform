import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './InterviewResultPage.module.css';
export const InterviewQuizResultPageSkeleton = () => {
	return (
		<div className={styles.container}>
			<Card className={styles.block}>
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
			</Card>
			<Flex direction="column" gap="16">
				<Card className={styles.block}>
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
				</Card>
				<Flex justify="between" gap="12">
					{[...Array(4)].map((_, i) => (
						<Card key={i} className={styles.stats}>
							<Skeleton width="88%" height={17} style={{ marginBottom: 12, flexGrow: 1 }} />
							<Skeleton width="88%" height={17} />
						</Card>
					))}
				</Flex>
			</Flex>
			<Card className={styles.passed}>
				<Flex direction="column" gap="16" align="center">
					<Skeleton width={'clamp(350px, 5vw, 600px)'} height={30} />
					<div className={styles['question-list']}>
						{[...Array(6)].map((_, i) => (
							<Flex key={i} gap="16" align="center" style={{ width: '100%' }}>
								<Skeleton width="150px" />
								<Flex gap="16" direction="column" style={{ width: '100%' }}>
									<Skeleton width={'90%'} height={50} />
									<Flex gap="8">
										<Skeleton width="30px" height={30} />
										<Skeleton width="55px" height={30} />
									</Flex>
								</Flex>
							</Flex>
						))}
					</div>
				</Flex>
			</Card>
		</div>
	);
};
