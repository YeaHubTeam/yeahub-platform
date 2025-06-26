import { CardLayoutSkeleton } from '../CardLayout/CardLayout.skeleton';

import { SpecializationBlockSkeleton } from './SpecializationBlock/SpecializationBlock.skeleton';

export const SpecializationCardSkeleton = () => {
	return <CardLayoutSkeleton contentSlot={<SpecializationBlockSkeleton />} />;
};
