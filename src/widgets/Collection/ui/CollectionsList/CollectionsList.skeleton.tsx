import { Flex } from '@/shared/ui/Flex';

import { CollectionsPreviewSkeleton } from '@/entities/collection';

export const CollectionsListSkeleton = () => {
	return (
		<Flex direction="column" gap="20">
			{[...Array(6)].map((_, i) => (
				<CollectionsPreviewSkeleton key={i} />
			))}
		</Flex>
	);
};
