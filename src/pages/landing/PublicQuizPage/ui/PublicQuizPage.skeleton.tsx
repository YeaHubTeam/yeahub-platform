import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './PublicQuizPage.module.css';

export const PublicQuizPageSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" className={styles.container}>
			<Card>
				<Flex gap="16" direction="column">
					<div className={styles['progress-bar']}>
						<Skeleton width={240} height={24} />
						<Skeleton width={24} height={24} />
					</div>
					<Skeleton width="100%" height={3} borderRadius={50}></Skeleton>
				</Flex>
			</Card>
			<Card className={styles['slider-card-skeleton']}>
				<Flex direction="column" gap="16">
					<Flex justify="between" className={styles['slider-navigation']}>
						{Array(2)
							.fill(0)
							.map((_, i) => (
								<Skeleton key={i} width={28} height={28} borderRadius={'50%'} />
							))}
					</Flex>
					<div className={styles['slider-skeleton']}>
						<Skeleton width="100%" height={40} className={styles['question-skeleton']} />
						<Skeleton width={137} height={14} className={styles['wrapper-skeleton']} />
						<Flex gap="8" className={styles['response-buttons-skeleton']}>
							{Array(2)
								.fill(0)
								.map((_, i) => (
									<Skeleton
										key={i}
										height={44}
										borderRadius={12}
										width={isMobile ? '60px' : '100px'}
									/>
								))}
						</Flex>
						{/* <Skeleton height={303} borderRadius={24} className={styles['image-skeleton']} /> */}
					</div>

					<Flex justify="between">
						<Skeleton height={48} width={128}></Skeleton>
						{/* <Skeleton height={48} width={178}></Skeleton> */}
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
};
