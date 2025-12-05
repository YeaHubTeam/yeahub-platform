import { Response } from '@/shared/libs/query';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';

export interface Topic {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	skill: Skill;
	createdAt: string;
	updatedAt: string;
}

export interface GetTopicsListParamsRequest {
	page?: number;
	limit?: number;
	title?: string;
	skillIds?: number[];
}

export type GetTopicsListResponse = Response<Topic[]>;
