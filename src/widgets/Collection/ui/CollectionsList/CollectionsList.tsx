import { useLocation } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';

import { Collection } from '@/entities/collection';
import { CollectionPreview } from '@/entities/collection';

interface CollectionsListProps {
	collections: Collection[];
}

export const CollectionsList = ({ collections }: CollectionsListProps) => {
	const { search } = useLocation();

	return (
		<Flex direction="column" gap="20">
			{collections &&
				collections.map((collection) => (
					<CollectionPreview key={collection.id} collection={collection} queryParams={search} />
				))}
		</Flex>
	);
};
