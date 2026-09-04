import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';

import { SkillCardSkeleton } from '@/entities/skill';

import { DeleteSkillButtonSkeleton } from '@/features/skill/deleteSkill';

export const SkillDetailPageSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<DeleteSkillButtonSkeleton isDetailPage />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>

			<SkillCardSkeleton />
		</>
	);
};
