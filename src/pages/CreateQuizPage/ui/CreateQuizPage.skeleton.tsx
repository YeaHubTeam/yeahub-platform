import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './CreateQuizPage.module.css';

export const CreateQuizPageSkeleton = () => {
	return (
		<section>
			<Card className={styles.container}>
				<Skeleton width={200} height={33} className={styles.title} />
				<Flex
					direction="row"
					justify="between"
					style={{ width: '100%' }}
					className={styles.wrapper}
					gap="40"
				>
					<Flex direction="column" gap="8" style={{ flex: '1 1 60%' }}>
						<Skeleton width={137} height={19} />
						<Flex gap="8" style={{ flexWrap: 'wrap' }}>
							{[...Array(4)].map(() =>
								[...Array(5)].map((_, j) => (
									<Skeleton key={j} height={40} style={{ flex: '0 1 130px' }} />
								)),
							)}
						</Flex>
					</Flex>
					<Flex direction="column" gap="24" style={{ flex: '1 1 40%' }}>
						<Flex gap="8" direction="column">
							<Skeleton width={137} height={19} />
							<Flex gap="8" style={{ flexWrap: 'wrap' }}>
								{[...Array(4)].map((_, j) => (
									<Skeleton key={j} width={60} height={40} />
								))}
							</Flex>
						</Flex>
						<Flex gap="8" direction="column">
							<Skeleton width={120} height={19} />
							<Flex gap="8" style={{ flexWrap: 'wrap' }}>
								{[...Array(3)].map((_, j) => (
									<Skeleton key={j} width={120} height={40} />
								))}
							</Flex>
						</Flex>
						<Flex gap="8" direction="column">
							<Skeleton width={120} height={19} />
							<Flex gap="8">
								<Skeleton width={115} height={40} />
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<Skeleton width={170} height={48} borderRadius={40} className={styles.button} />
			</Card>
		</section>
	);
};
