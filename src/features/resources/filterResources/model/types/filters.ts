import { ResourceTypeCode } from '@/entities/resource';

export interface ResourcesFilterParams {
	title?: string;
	specialization?: number;
	page?: number;
	skills?: number[];
	types?: ResourceTypeCode[];
	isMy?: boolean;
}
