import { CardLayoutSkeleton } from '../CardLayout/CardLayout.skeleton';

import { SkillsBlockSkeleton } from './SkillsBlock/SkillsBlock.skeleton';

export const SkillsCardSkeleton = () => {
	return <CardLayoutSkeleton contentSlot={<SkillsBlockSkeleton />} />;
};
