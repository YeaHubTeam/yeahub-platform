import { Skeleton } from '@/shared/ui/Skeleton';

/**
 * Skeleton for BarChart component.
 * Used as a placeholder while data is loading.
 *
 * @returns JSX.Element
 */
export const BarChartSkeleton = () => {
	return <Skeleton width="100%" height={12} borderRadius={8} />;
};
