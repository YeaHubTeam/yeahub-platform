import { CollectionsFiltersSkeleton } from '@/features/collections/filterCollections';

import { CollectionsListSkeleton } from '@/widgets/Collection';
import { ListLayoutPageSkeleton } from '@/widgets/ListLayoutPage';

export const CollectionsPageSkeleton = () => {
	return (
		<ListLayoutPageSkeleton
			filters={<CollectionsFiltersSkeleton />}
			list={<CollectionsListSkeleton />}
			widthText={124}
		/>
	);
};
