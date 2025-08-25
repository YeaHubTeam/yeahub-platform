import { Response, SortOrder } from '@/shared/types/types';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

export type ResourceAccessCategory = 'free' | 'has_trial' | 'payed_only';

export interface Resource {
	id: string;
	name: string;
	provider: string;
	iconBase64: string;
	description: string;
	accessCategory: ResourceAccessCategory;
	type?: ResourceType;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
	createdById: string;
	specializations: Specialization[];
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
	keywords?: string[];
};

export type ResourceTypeCode =
	| 'video'
	| 'podcast'
	| 'channel'
	| 'course'
	| 'article'
	| 'book'
	| 'guide'
	| 'roadmap'
	| 'trainer'
	| 'game'
	| 'repository'
	| 'chat'
	| 'tool'
	| 'documentation';

export interface ResourceType {
	code: ResourceTypeCode;
	description: string;
}

export type GetResourceTypesResponse = ResourceType[];
