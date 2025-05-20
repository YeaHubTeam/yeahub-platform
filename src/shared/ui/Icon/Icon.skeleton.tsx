import { Skeleton } from '@/shared/ui/Skeleton';

import { IconProps } from './Icon';

export const IconSkeleton = ({ size, className, borderRadius = 4 }: Partial<IconProps>) => {
	return <Skeleton width={size} height={size} className={className} borderRadius={borderRadius} />;
};
