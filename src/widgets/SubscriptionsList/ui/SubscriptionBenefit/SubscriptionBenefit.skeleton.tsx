import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

export const SubscriptionBenefitSkeleton = () => {
	return (
		<Flex align="center" gap="8">
			<IconSkeleton size={20} />
			<TextSkeleton variant="body2" width="100%" />
		</Flex>
	);
};
