import { Skeleton } from '../Skeleton';
import type { SkeletonBlockProps } from '../Skeleton/Skeleton';

type TextAreaSkeletonProps = Pick<
	SkeletonBlockProps,
	'width' | 'height' | 'className' | 'borderRadius'
>;

export const TextAreaSkeleton = ({
	width,
	height,
	className,
	borderRadius,
}: TextAreaSkeletonProps) => {
	return (
		<Skeleton className={className} width={width} height={height} borderRadius={borderRadius} />
	);
};
