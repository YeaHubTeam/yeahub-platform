import { Skeleton } from '@/shared/ui/Skeleton';
/**
 * Skeleton for GaugeChart component.
 * Used as a placeholder while data is loading.
 *
 * @returns JSX.Element
 */
export const GaugeChartSkeleton = () => {
	return <Skeleton style={{ margin: '0 auto' }} height={241} width={241} borderRadius="50%" />;
};
