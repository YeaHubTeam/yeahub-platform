import { Response, SelectedEntities, SortOrder } from '@/shared/types/types';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

import { CreateOrEditOrViewResourceFormValues, ResourceTypeCode } from './resource';

export type ResourceRequestStatus = 'pending' | 'approved' | 'rejected';

export interface ResourceRequestSkill {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: string;
	updatedAt: string;
}

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
	keywords?: string[];
	userId?: string;
	status?: ResourceRequestStatus;
	page?: number;
	limit?: number;
	name?: string;
	orderBy?: string;
	order?: SortOrder;
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

export interface GetResourceRequestParams {
	requestId: string | undefined;
}
