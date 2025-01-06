import { Skeleton } from '@/shared/ui/Skeleton';

export const PieChartSkeleton = () => {
	return (
		<Skeleton
			width="clamp(192px, calc(192px + 9.98vw - 57.6px), 307px)"
			height="clamp(192px, calc(192px + 9.98vw - 57.6px), 307px)"
			borderRadius="50%"
		/>
	);
};
