import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const KeywordsListSkeleton = () => {
	return (
		<Flex wrap="wrap" gap="10">
			{[...Array(2)].map((_, index) => {
				return <TextSkeleton key={index} variant="body3" width={100} />;
			})}
		</Flex>
	);
};
