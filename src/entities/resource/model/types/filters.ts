export interface FilterParams {
	specialization?: number | number[];
	skills?: number[];
	resources?: string | string[];
	keywords?: string | string[];
}

export type DisplayMode = 'popover' | 'link';
