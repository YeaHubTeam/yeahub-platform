import { CardSkeleton } from '@/shared/ui/Card';

import { CollectionNavigationButtonsSkeleton } from '@/features/collections/navigateCollection';

export const CollectionNavigationSkeleton = () => {
	return (
		<CardSkeleton withOutsideShadow>
			<CollectionNavigationButtonsSkeleton width={160} />
		</CardSkeleton>
	);
};
