import { ResourceRequestStatus } from './resource';

export interface FilterParams {
	specialization?: number | number[];
	skills?: number[];
	resources?: string | string[];
	keywords?: string | string[];
}

export interface MyResourcesFilterParams extends FilterParams {
	status?: ResourceRequestStatus;
}

export type DisplayMode = 'popover' | 'link';
