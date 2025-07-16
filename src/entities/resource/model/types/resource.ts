import { Response, SortOrder } from '@/shared/types/types';

export type ResourceAccessCategory = 'free' | 'has_trial' | 'payed_only';

export interface Resource {
	id: string;
	name: string;
	provider: string;
	iconBase64: string;
	description: string;
	accessCategory: ResourceAccessCategory;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
	createdById: string;
}

export interface GetResourcesListParamsRequest {
	page?: number;
	limit?: number;
	name?: string;
	provider?: string;
	accessCategory?: ResourceAccessCategory;
	authorId?: string;
	orderBy?: string;
	order?: SortOrder;
	random?: boolean;
}

export type GetResourcesListResponse = Response<Resource[]>;

export type CreateOrEditResourceFormValues = Pick<
	Resource,
	'id' | 'name' | 'provider' | 'description' | 'iconBase64' | 'accessCategory' | 'isActive'
> & {
	specializations: number[];
	skills: number[];
	types: number[];
	keywords: string[];
};
