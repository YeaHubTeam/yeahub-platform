import { ResourceTypeCode } from '@/entities/resource';

export interface ResourcesFilterParams {
	authorId?: string;
	title?: string;
	specialization?: number;
	page?: number;
	skills?: number[];
	types?: ResourceTypeCode[];
	isMy?: boolean;
}
