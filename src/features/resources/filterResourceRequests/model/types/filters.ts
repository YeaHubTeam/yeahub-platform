import { ResourceRequestStatus, ResourceTypeCode } from '@/entities/resource';

export interface ResourceRequestsFilterParams {
	title?: string;
	page?: number;
	types?: ResourceTypeCode[];
	status?: ResourceRequestStatus | 'all';
}
