import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './InterviewQuizPage.module.css';

interface InterviewQuizPageSkeletonProps {
	hasImage: boolean;
}

export const InterviewQuizPageSkeleton = ({ hasImage }: InterviewQuizPageSkeletonProps) => {
	return (
		<div className={styles.container}>
			<Card>
				<div className={styles['progress-bar']}>
					<Skeleton width={200} height={40} />
					<Skeleton width={30} height={40} />
				</div>
			</Card>
			<Card className={styles['slider-card-skeleton']}>
				<div className={styles['slider-skeleton']}>
					<Skeleton height={40} className={styles['question-skeleton']} />
					<Skeleton width={137} height={14} className={styles['wrapper-skeleton']} />
					<Flex gap="8" className={styles['response-buttons-skeleton']}>
						{Array(3)
							.fill(0)
							.map((_, i) => (
								<Skeleton key={i} height={44} borderRadius={12} width={150} />
							))}
					</Flex>
					{hasImage && (
						<Skeleton height={303} borderRadius={24} className={styles['image-skeleton']} />
					)}
				</div>
			</Card>
		</div>
	);
};
