import { ChipSkeleton } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';

export const SkillListSkeleton = () => {
	return (
		<Flex componentType="ul" gap="10" wrap="wrap">
			{[...Array(10)].map((_, index) => {
				return (
					<li key={index}>
						<ChipSkeleton />
					</li>
				);
			})}
		</Flex>
	);
};
