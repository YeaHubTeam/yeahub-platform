import { Skeleton } from '@/shared/ui/Skeleton';

import { IconProps } from './Icon';

export const IconSkeleton = ({
	dataTestId,
	size,
	className,
	borderRadius = 4,
}: Partial<IconProps>) => {
	return (
		<Skeleton
			dataTestId={dataTestId}
			width={size}
			height={size}
			className={className}
			borderRadius={borderRadius}
		/>
	);
};
