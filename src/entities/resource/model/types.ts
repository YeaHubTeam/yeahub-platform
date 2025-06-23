export interface FilterParams {
	specialization?: number | number[];
	skills?: number[];
	resource?: number[];
	keywords?: string | string[];
	status?: MarketplaceFilterStatus;
}

export type MarketplaceFilterStatus = 'all' | 'learned' | 'not-learned';

export interface MarketplaceFilterStatusItem {
	id: MarketplaceFilterStatus;
	title: string;
}

export type DisplayMode = 'popover' | 'link';
