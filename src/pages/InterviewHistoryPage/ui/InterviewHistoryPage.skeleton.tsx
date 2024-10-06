import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import styles from './InterviewHistoryPage.module.css';

export const InterviewHistoryPageSkeleton = () => {
	return (
		<section className={styles['skeleton-wrapper']}>
			<div className={styles['skeleton-card-block']}>
				<Skeleton width="36px" height="36px" className={styles['skeleton-mobile-calendar']} />
				{[...Array(3)].map((_, i) => (
					<Card key={i} className={styles['skeleton-card']}>
						<Flex gap="20" justify="between" style={{ marginBottom: '48px' }}>
							<Skeleton width="177px" height="25px" />
							<Skeleton width="100px" height="20px" />
						</Flex>
						<Flex gap="24" style={{ flexWrap: 'wrap', marginBottom: '34px' }}>
							<Skeleton width="132px" height="22px" />
							<Skeleton width="196px" height="22px" />
							<Skeleton width="191px" height="22px" />
							<Skeleton width="96px" height="22px" />
						</Flex>
						<Skeleton width="137px" height="19px" />
						<Flex gap="8" style={{ flexWrap: 'wrap', marginTop: '8px' }}>
							<Skeleton width="97px" height="42px" />
							<Skeleton width="144px" height="42px" />
							<Skeleton width="114px" height="42px" />
							<Skeleton width="85px" height="42px" />
							<Skeleton width="95px" height="42px" />
							<Skeleton width="97px" height="42px" />
							<Skeleton width="144px" height="42px" />
							<Skeleton width="85px" height="42px" />
							<Skeleton width="95px" height="42px" />
							<Skeleton width="97px" height="42px" />
							<Skeleton width="144px" height="42px" />
						</Flex>
					</Card>
				))}
			</div>
			<Card className={styles['skeleton-calendar']}>
				<Flex justify="between" style={{ marginBottom: '31px' }}>
					<Skeleton width="24px" height="25px" />
					<Skeleton width="64px" height="25px" />
					<Skeleton width="24px" height="24px" />
				</Flex>
				<Flex gap="12" direction="column">
					<Skeleton width="311px" height="19px" style={{ marginBottom: '16px' }} />
					<Skeleton width="312px" height="19px" />
					<Skeleton width="312px" height="19px" />
					<Skeleton width="312px" height="19px" />
					<Skeleton width="312px" height="19px" />
					<Skeleton width="150px" height="19px" />
				</Flex>
			</Card>
		</section>
	);
};
