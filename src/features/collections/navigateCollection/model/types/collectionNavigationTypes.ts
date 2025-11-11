import type { FilterFromUser } from '@/shared/hooks';

export type CollectionNavigation = {
	collectionId: number | string;
	filter: FilterFromUser;
};
