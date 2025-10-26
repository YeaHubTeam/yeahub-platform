import { ResourceRequestStatus, ResourceTypeCode } from '@/entities/resource';

export interface ResourcesFilterParams {
	title?: string;
	specialization?: number;
	page?: number;
	skills?: number[];
	types?: ResourceTypeCode[];
}

export interface ResourceRequestsFilterParams {
	title?: string;
	page?: number;
	types?: ResourceTypeCode[];
	status?: ResourceRequestStatus | 'all';
}
