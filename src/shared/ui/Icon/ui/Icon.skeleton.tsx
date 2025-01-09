import { Skeleton } from '@/shared/ui/Skeleton';

import { IconProps } from './Icon';

export const IconSkeleton = ({ size, className }: Partial<IconProps>) => {
	return <Skeleton width={size} height={size} className={className} borderRadius={4} />;
};
