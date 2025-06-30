import { Skeleton } from '@/shared/ui/Skeleton';

import { CardLayoutSkeleton } from '../CardLayout/CardLayout.skeleton';

export const FiltersCardSkeleton = () => {
	return <CardLayoutSkeleton contentSlot={<Skeleton width={241} height={198} />} />;
};
