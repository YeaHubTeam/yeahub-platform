import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './InterviewHistoryPage.module.css';

export const InterviewHistoryPageSkeleton = () => {
	return (
		<section className={styles['skeleton-wrapper']}>
			<div>
				{[...Array(3)].map((_, i) => (
					<Card key={i} className={styles['skeleton-card']}>
						<Skeleton height="200px" />
					</Card>
				))}
			</div>
			<Card className={styles['skeleton-calendar']}>
				<Skeleton width="312px" height="276px" />
			</Card>
		</section>
	);
};
