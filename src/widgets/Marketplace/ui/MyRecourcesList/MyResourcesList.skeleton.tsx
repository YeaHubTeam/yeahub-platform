import { Flex } from '@/shared/ui/Flex';

import { ResourceCardSkeleton } from '@/entities/resource';

export const MyResourcesListSkeleton = () => {
	return (
		<Flex direction="column" gap="20">
			{[...Array(6)].map((_, i) => (
				<ResourceCardSkeleton key={i} />
			))}
		</Flex>
	);
};
