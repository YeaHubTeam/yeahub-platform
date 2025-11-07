import { Flex } from '@/shared/ui/Flex';

import { Collection } from '@/entities/collection';
import { CollectionPreview } from '@/entities/collection';

interface CollectionsListProps {
	collections: Collection[];
	queryFilter?: string;
}

export const CollectionsList = ({ collections, queryFilter }: CollectionsListProps) => {
	return (
		<Flex direction="column" gap="20">
			{collections &&
				collections.map((collection) => (
					<CollectionPreview
						key={collection.id}
						collection={collection}
						queryFilter={queryFilter}
					/>
				))}
		</Flex>
	);
};
