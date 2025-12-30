import { Flex } from '@/shared/ui/Flex';

import { SkillChipSkeleton } from '../../../SkillChip/SkillChip.skeleton';
import { CardBlockLayoutSkeleton } from '../../CardBlockLayout/CardBlockLayout.skeleton';

export const SpecializationBlockSkeleton = () => {
	return (
		<CardBlockLayoutSkeleton hasOffset>
			{Array.from({ length: 3 }).map((_, i) => (
				<Flex gap="16" key={i}>
					<SkillChipSkeleton label="true" />
					<SkillChipSkeleton label="true" />
					<SkillChipSkeleton label="true" />
				</Flex>
			))}
		</CardBlockLayoutSkeleton>
	);
};
