import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const TaskBodySkeleton = () => {
	return (
		<Flex direction="column" gap="20" maxWidth>
			<Flex wrap="nowrap" gap="20">
				<TextSkeleton variant="body1" width={110}></TextSkeleton>
				<TextSkeleton variant="body3" width="100%"></TextSkeleton>
			</Flex>
		</Flex>
	);
};
