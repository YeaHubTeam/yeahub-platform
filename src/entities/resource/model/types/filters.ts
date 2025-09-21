export interface FilterParams {
	specialization?: number | number[];
	skills?: number[];
	resources?: string | string[];
	keywords?: string | string[];
}

export type ResourcesFilterStatus = 'pending' | 'approved' | 'rejected';

export interface MyResourcesFilterParams extends FilterParams {
	status?: ResourcesFilterStatus;
}

export type DisplayMode = 'popover' | 'link';
