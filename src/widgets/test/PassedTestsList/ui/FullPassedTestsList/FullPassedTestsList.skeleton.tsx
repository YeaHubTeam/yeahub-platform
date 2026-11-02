import { Flex } from '@/shared/ui/Flex';

import { FullPassedTestsItemSkeleton } from '../FullPassedTestsItem/FullPassedTestsItem.skeleton';

export const FullPassedTestsListSkeleton = () => {
	return (
		<Flex componentType="ul" direction="column" maxWidth gap="20">
			{[...Array(4)].map((_, index) => (
				<FullPassedTestsItemSkeleton key={index} />
			))}
		</Flex>
	);
};
