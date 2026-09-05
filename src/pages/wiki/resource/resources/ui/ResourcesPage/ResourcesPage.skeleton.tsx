import { ResourcesFiltersSkeleton } from '@/features/resources/filterResources';

import { ListLayoutPageSkeleton } from '@/widgets/ListLayoutPage';
import { ResourcesListSkeleton } from '@/widgets/Marketplace';

export const ResourcesPageSkeleton = () => {
	return (
		<ListLayoutPageSkeleton
			widthText={250}
			filters={<ResourcesFiltersSkeleton />}
			list={<ResourcesListSkeleton />}
			isEmailVerified
		/>
	);
};
