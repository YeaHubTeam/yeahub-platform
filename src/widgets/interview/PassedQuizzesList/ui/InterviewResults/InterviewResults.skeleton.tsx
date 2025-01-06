import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

export const InterviewResultsSkeleton = () => {
	return (
		<Flex align="center" gap="8">
			<TextSkeleton variant="body3-accent" width={80} />
			<Flex align="center" gap="8">
				<Flex align="center" gap="4">
					<IconSkeleton size={24} />
					<TextSkeleton variant="body3-accent" width={10} />
				</Flex>
				<Flex align="center" gap="4">
					<IconSkeleton size={24} />
					<TextSkeleton variant="body3-accent" width={10} />
				</Flex>
			</Flex>
		</Flex>
	);
};
