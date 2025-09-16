import { Response, SortOrder } from '@/shared/types/types';

import { ResourceTypeCode } from './resource';

export enum ResourceRequestStatus {
	PENDING = 'pending',
	APPROVED = 'approved',
	REJECTED = 'rejected',
}

export interface ResourceRequestSpecialization {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: string;
	updatedAt: string;
}

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
	specializations: ResourceRequestSpecialization[];
	skills: ResourceRequestSkill[];
}

export interface GetResourceRequestsParams {
	name?: string;
	types?: string[];
	userId?: string;
	specializations?: number[];
	skills?: number[];
	keywords?: string[];
	status?: ResourceRequestStatus;
	page?: number;
	limit?: number;
	orderBy?: string;
	order?: SortOrder;
	random?: boolean;
}

export type GetResourceRequestsResponse = Response<ResourceRequest[]>;

export interface SelectedResourceRequestEntity {
	id: string;
	title?: string;
	disabled?: boolean;
}
export type SelectedResourceRequestEntities = SelectedResourceRequestEntity[];
