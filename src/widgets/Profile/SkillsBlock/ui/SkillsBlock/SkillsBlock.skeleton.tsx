import { CardSkeleton } from '@/shared/ui/Card';

import { SkillsBlockHeaderSkeleton } from '../SkillsBlockHeader/SkillsBlockHeader.skeleton';
import { SkillsBlockListSkeleton } from '../SkillsBlockList/SkillsBlockList.skeleton';

export const SkillsBlockSkeleton = ({ isEdit }: { isEdit?: boolean }) => {
	return (
		<CardSkeleton>
			<SkillsBlockHeaderSkeleton isEdit={isEdit} />
			<SkillsBlockListSkeleton />
		</CardSkeleton>
	);
};
