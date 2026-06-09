import { ChipSkeleton } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const ReferralLinkDateSkeleton = () => {
	return (
		<Flex direction="column" gap="16">
			<TextSkeleton width={60} variant="body3" />
			<ChipSkeleton label="..." withText={110} />
		</Flex>
	);
};
