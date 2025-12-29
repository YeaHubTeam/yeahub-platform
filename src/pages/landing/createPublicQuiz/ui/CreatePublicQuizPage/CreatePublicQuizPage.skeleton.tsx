import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './CreatePublicQuizPage.module.css';

export const CreatePublicQuizPageSkeleton = () => {
	return (
		<section data-testid="CreatePublicQuizPageSkeleton">
			<Card>
				<Skeleton width={200} height={33} className={styles.title} />
				<Flex className={styles.content} direction="row" justify="between" gap="40">
					<Flex className={styles['skills-selection']} direction="column" gap="24">
						<Flex direction="column" gap="8">
							<Skeleton width={200} height={19} />
							<Flex gap="8" style={{ flexWrap: 'wrap' }}>
								{[...Array(5)].map((_, index) => (
									<Skeleton
										key={index}
										height={42}
										style={{
											flex: '1 1 200px',
											maxWidth: '230px',
										}}
									/>
								))}
							</Flex>
						</Flex>

						<Flex direction="column" gap="8">
							<Skeleton width={137} height={19} />
							<Flex gap="8" style={{ flexWrap: 'wrap' }}>
								{[...Array(5)].map((_, index) => (
									<Skeleton
										key={index}
										height={42}
										style={{
											flex: '1 1 100px',
										}}
									/>
								))}
							</Flex>
						</Flex>
					</Flex>

					<Flex className={styles['quiz-settings']} direction="column" gap="24">
						<Flex direction="column" gap="8">
							<Skeleton width={137} height={19} />
							<Flex gap="8" style={{ flexWrap: 'wrap' }}>
								{[...Array(4)].map((_, index) => (
									<Skeleton key={index} width={60} height={42} />
								))}
							</Flex>
						</Flex>

						<Flex direction="column" gap="8">
							<Skeleton width={120} height={19} />
							<Flex gap="8" style={{ flexWrap: 'wrap' }}>
								{[...Array(3)].map((_, index) => (
									<Skeleton key={index} width={120} height={42} />
								))}
							</Flex>
						</Flex>

						<Flex direction="column" gap="8">
							<Skeleton width={120} height={19} />
							<Skeleton width={115} height={42} />
						</Flex>
					</Flex>
				</Flex>

				<Skeleton width={170} height={48} borderRadius={12} className={styles.button} />
			</Card>
		</section>
	);
};
