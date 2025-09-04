import { Response, SortOrder } from '@/shared/types/types';

export type ResourceAccessCategory = 'free' | 'has_trial' | 'payed_only';

export interface Resource {
	id: string;
	name: string;
	url: string;
	iconBase64: string;
	description: string;
	type: ResourceType;
	specializations: ResourseSpecialization[];
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
	'id' | 'name' | 'url' | 'description' | 'iconBase64' | 'accessCategory' | 'isActive'
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

export interface ResourseSpecialization {
	id: number;
	title: string;
}

export type GetResourceTypesResponse = ResourceType[];
