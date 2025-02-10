import { CollectionAccess } from '@/widgets/Collection';

export interface CollectionsPageState {
	page?: number;
	title?: string;
	tariff?: string;
	specialization?: string | string[];
	access: CollectionAccess;
}
