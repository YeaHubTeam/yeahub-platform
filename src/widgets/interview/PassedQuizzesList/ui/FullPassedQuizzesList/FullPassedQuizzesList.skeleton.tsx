import { Flex } from '@/shared/ui/Flex';

import { FullPassedQuizzesItemSkeleton } from '../FullPassedQuizzesItem/FullPassedQuizzesItem.skeleton';

export const FullPassedQuizzesListSkeleton = () => {
	return (
		<Flex componentType="ul" direction="column" maxWidth gap="20">
			{[...Array(4)].map((_, index) => (
				<FullPassedQuizzesItemSkeleton key={index} />
			))}
		</Flex>
	);
};
