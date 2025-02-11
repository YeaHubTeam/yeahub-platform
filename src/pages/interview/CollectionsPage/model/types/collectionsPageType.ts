import { CollectionTariff } from '@/entities/collection';

export interface CollectionsPageState {
	page?: number;
	title?: string;
	tariff?: string;
	specialization?: string | string[];
	access: CollectionTariff;
}
