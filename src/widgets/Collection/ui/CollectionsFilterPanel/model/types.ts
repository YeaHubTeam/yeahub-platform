export interface FilterParams {
	title?: string;
	specialization?: number[] | undefined;
	tariff?: boolean;
	page?: number;
}

export type CollectionAccess = 'free' | 'premium';

export interface CollectionFilterStatusItem {
	id: CollectionAccess;
	title: string;
}

export type DisplayMode = 'popover' | 'link';
