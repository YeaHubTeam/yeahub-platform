import { Response, SelectedEntities } from '@/shared/libs';

import { Skill } from '@/entities/skill/@x/resource';
import { Specialization } from '@/entities/specialization/@x/resource';

import { CreateOrEditOrViewResourceFormValues, ResourceTypeCode } from './resource';

export type ResourceRequestStatus = 'pending' | 'approved' | 'rejected';

export interface ResourceRequestPayload {
	name: string;
	iconBase64?: string;
	description: string;
	keywords: string[];
	url: string;
	type: ResourceTypeCode;
	imageSrc?: string;
}

export interface ResourceRequest {
	id: string;
	userId: string;
	requestPayload: ResourceRequestPayload;
	status: ResourceRequestStatus;
	createdAt: string;
	reviewedAt: string | null;
	reviewedBy: string | null;
	specializations: Specialization[];
	skills: Skill[];
}

export interface GetResourceRequestsParams {
	types?: string[];
	specializations?: number[];
	skills?: number[];
	userId?: string;
	status?: ResourceRequestStatus;
	page?: number;
	limit?: number;
	search?: string;
}

export type GetResourceRequestsResponse = Response<ResourceRequest[]>;

export interface SelectedResourceRequestEntity {
	id: string;
	title?: string;
	disabled?: boolean;
}
export type SelectedResourceRequestEntities = SelectedEntities<ResourceRequest['id']>;
export type ResourceRequestFormValues = CreateOrEditOrViewResourceFormValues & {
	status: ResourceRequestStatus;
};

export type ResourceRequestCreateError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'externalproducts.skill.not_found'
	| 'externalproducts.specialization.not_found'
	| 'externalproducts.resource_type.not_found';
