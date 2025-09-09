import { Response, SortOrder } from '@/shared/types/types';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

export interface Resource {
	id: string;
	name: string;
	description: string;
	type: ResourceType;
	url: string;
	keywords?: string[];
	imageSrc: string;
	specializations: Specialization[];
	skills: Skill[];
	createdById: string;
	createdBy: Author;
	createdAt: string;
	updatedAt: string;
	iconBase64?: string;
}

export interface GetResourcesListParamsRequest {
	types?: string[];
	specializations?: number | number[];
	skills?: number[];
	keywords?: string[];
	page?: number;
	limit?: number;
	name?: string;
	authorId?: string;
	orderBy?: string;
	order?: SortOrder;
	random?: boolean;
}

export interface GetMyResourcesRequest {
	page?: number;
	limit?: number;
}

export type GetResourcesListResponse = Response<Resource[]>;

export type GetResourceByIdParamsRequest = {
	resourceId?: string;
};

export type GetResourceByIdResponse = Resource;

export type CreateOrEditResourceFormValues = Pick<
	Resource,
	'id' | 'name' | 'description' | 'iconBase64' | 'url'
> & {
	resourceSkills: number[];
	resourceSpecializations: number[];
	keywords: string[];
	type: ResourceTypeCode;
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

export type Author = { id: string; username: string };

export type GetResourceTypesResponse = ResourceType[];
