import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './AnalyticsPageSkeleton.module.css';

interface AnalyticsTableSkeletonProps {
	rowsCount?: number;
}

export const AnalyticsTableSkeleton = ({ rowsCount = 10 }: AnalyticsTableSkeletonProps) => {
	return (
		<div data-testid="analytics-table-skeleton">
			<Flex justify="between" style={{ marginBottom: '12px', padding: '0 12px' }}>
				<Flex justify="between">
					<Skeleton width={20} height={20} dataTestId="column-header-index" />
					<Skeleton
						width={100}
						height={20}
						style={{ marginLeft: '20px' }}
						dataTestId="column-header-questions"
					/>
				</Flex>
				<Skeleton width={120} height={20} dataTestId="column-header-percentage" />
			</Flex>

			<div className={styles.tableBody}>
				{Array.from({ length: rowsCount }).map((_, rowIndex) => (
					<div key={rowIndex} className={styles.tableRow} data-testid={`table-row-${rowIndex}`}>
						<div className={styles.tableCell} style={{ width: '50px' }}>
							<Skeleton width={24} height={24} dataTestId={`row-${rowIndex}-col-index`} />
						</div>

						<div className={styles.tableCell} style={{ flex: 1 }}>
							<Flex direction="column" gap="8">
								<Skeleton width="70%" height={18} dataTestId={`row-${rowIndex}-col-title`} />
								<Skeleton
									width={90}
									height={22}
									borderRadius="12px"
									dataTestId={`row-${rowIndex}-col-badge`}
								/>
							</Flex>
						</div>

						<div className={styles.tableCell} style={{ width: '120px' }}>
							<Skeleton width={60} height={20} dataTestId={`row-${rowIndex}-col-metric`} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
