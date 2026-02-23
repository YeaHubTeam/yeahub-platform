import { Response, SortOrder } from '@/shared/libs';
import { Author } from '@/shared/ui/AuthorInfo';

import { Skill } from '@/entities/skill/@x/resource';
import { Specialization } from '@/entities/specialization/@x/resource';

export interface Resource {
	id: string;
	name: string;
	description: string;
	type: ResourceType;
	url: string;
	keywords: string[];
	imageSrc: string;
	specializations: Specialization[];
	skills: Skill[];
	createdBy: Author;
	createdAt: string;
	updatedAt: string;
	iconBase64?: string | null;
}

export type ResourceRequestStatus = 'pending' | 'approved' | 'rejected';

export interface ResourceRequest {
	id: string;
	userId: string;
	requestPayload: {
		name: string;
		description: string;
		url: string;
		type: ResourceTypeCode;
		imageSrc: string;
		iconBase64?: string;
		keywords: string[];
	};
	specializations: Specialization[];
	skills: Skill[];
	createdAt: string;
	reviewedAt: string | null;
	reviewedBy: string | null;
	status: ResourceRequestStatus;
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

export interface GetMyRequestsResourcesParamsRequest {
	page?: number;
	limit?: number;
	search?: string;
	status?: ResourceRequestStatus | 'all';
	types?: string[];
	skills?: number[];
}

export type GetResourcesListResponse = Response<Resource[]>;

export type GetResourceByIdParamsRequest = {
	resourceId?: string;
};

export type GetResourceByIdResponse = Resource;

export type CreateOrEditOrViewResourceFormValues = Pick<
	Resource,
	'id' | 'name' | 'description' | 'iconBase64' | 'url'
> & {
	skills: number[];
	specializations: number[];
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

export type GetResourceTypesResponse = ResourceType[];
export type GetMyRequestsResourcesResponse = Response<ResourceRequest[]>;

export type GetResourceKeywordsResponse = Response<string[]>;

export interface GetResourceKeywordsParamsRequest {
	page?: number;
	limit?: number;
	title?: string;
}

export type ResourceCreateError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'externalproducts.skill.not_found'
	| 'externalproducts.specialization.not_found'
	| 'externalproducts.resource_type.not_found'
	| 'tinify.tinify.compress_failed'
	| 'tinify.tinify.resize_failed';
