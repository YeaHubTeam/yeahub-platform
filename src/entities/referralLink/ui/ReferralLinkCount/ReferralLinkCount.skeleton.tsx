import { ChipSkeleton } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const ReferralLinkCountSkeleton = () => {
	return (
		<Flex direction="column" gap="16">
			<TextSkeleton width={60} variant="body3" />
			<ChipSkeleton label="..." withText={10} />
		</Flex>
	);
};
