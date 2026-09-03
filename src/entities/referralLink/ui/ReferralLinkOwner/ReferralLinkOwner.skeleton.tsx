import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const ReferralLinkOwnerSkeleton = () => {
	return (
		<Flex gap="8" align="start">
			<TextSkeleton width={70} variant="body2-accent" />
			<TextSkeleton width={15} variant="body2-accent" />
		</Flex>
	);
};
