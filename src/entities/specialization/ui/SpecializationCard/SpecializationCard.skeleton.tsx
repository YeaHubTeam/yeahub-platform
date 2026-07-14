import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const SpecializationCardSkeleton = () => {
	return (
		<CardSkeleton withOutsideShadow>
			<Flex direction="column" gap="8">
				<TextSkeleton variant="body2" width="50%" />
				<TextSkeleton variant="body2" width="100%" />
			</Flex>
		</CardSkeleton>
	);
};
