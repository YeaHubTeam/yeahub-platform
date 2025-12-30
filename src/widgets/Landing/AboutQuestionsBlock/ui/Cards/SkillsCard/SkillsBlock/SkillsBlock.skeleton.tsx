import { Flex } from '@/shared/ui/Flex';

import { SkillChipSkeleton } from '../../../SkillChip/SkillChip.skeleton';
import { CardBlockLayoutSkeleton } from '../../CardBlockLayout/CardBlockLayout.skeleton';

const rows = [2, 3, 4];

export const SkillsBlockSkeleton = () => {
	return (
		<CardBlockLayoutSkeleton>
			{rows.map((count, rowIndex) => (
				<Flex gap="16" key={rowIndex}>
					{Array.from({ length: count }).map((_, i) => (
						<SkillChipSkeleton key={i} />
					))}
				</Flex>
			))}
		</CardBlockLayoutSkeleton>
	);
};
