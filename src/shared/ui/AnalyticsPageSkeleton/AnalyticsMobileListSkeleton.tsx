import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './AnalyticsPageSkeleton.module.css';

interface AnalyticsMobileListSkeletonProps {
	itemsCount?: number;
}

export const AnalyticsMobileListSkeleton = ({
	itemsCount = 3,
}: AnalyticsMobileListSkeletonProps) => {
	return (
		<div className={styles.mobileList} data-testid="analytics-mobile-list-skeleton">
			{Array.from({ length: itemsCount }).map((_, index) => (
				<div key={index} className={styles.mobileListItem}>
					<Flex direction="column" gap="8">
						<Flex justify="between" align="center">
							<Skeleton width="60%" height={18} dataTestId={`mobile-item-${index}-title`} />
							<Skeleton width={60} height={20} dataTestId={`mobile-item-${index}-metric`} />
						</Flex>
						<Skeleton
							width={90}
							height={22}
							borderRadius="12px"
							dataTestId={`mobile-item-${index}-badge`}
						/>
					</Flex>
					{index < itemsCount - 1 && <div className={styles.divider} />}
				</div>
			))}
		</div>
	);
};
