import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { SkillFormSkeleton } from '@/entities/skill';

import { SkillEditFormHeaderSkeleton } from '@/features/skill/editSkill';

export const SkillEditPageSkeleton = () => {
	return (
		<>
			<Flex componentType="main" direction="column" gap="24">
				<SkillEditFormHeaderSkeleton />
				<CardSkeleton>
					<SkillFormSkeleton mode="edit" />
				</CardSkeleton>
			</Flex>
		</>
	);
};
