export interface FilterParams {
	specialization?: number | number[];
	skills?: number[];
	resources?: number[];
	keywords?: string | string[];
	status?: MarketplaceFilterStatus;
}

export type MarketplaceFilterStatus = 'all' | 'learned' | 'not-learned' | 'favorite';

export interface MarketplaceFilterStatusItem {
	id: MarketplaceFilterStatus;
	title: string;
}

export type DisplayMode = 'popover' | 'link';
