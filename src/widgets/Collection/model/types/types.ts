export interface FilterParams {
	title?: string;
	specialization?: number[] | number;
	isFree?: boolean;
	page?: number;
}

export type DisplayMode = 'popover' | 'link';
