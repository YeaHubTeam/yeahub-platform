export interface FilterParams {
	title?: string;
	specialization?: number[] | number;
	tariff?: boolean;
	page?: number;
}

export type DisplayMode = 'popover' | 'link';
