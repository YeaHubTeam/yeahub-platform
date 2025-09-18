import { ChipSkeleton } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';

export const ResourceListSkeleton = () => {
	return (
		<Flex componentType="ul" gap="10" wrap="wrap">
			{[...Array(10)].map((_, index) => {
				return (
					<li key={index}>
						<ChipSkeleton label="..." withText={60} prefix={<IconSkeleton size={32} />} />
					</li>
				);
			})}
		</Flex>
	);
};
