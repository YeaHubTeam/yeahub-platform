import { Response } from '@/shared/libs';

import { Skill } from '@/entities/skill/@x/topic';

export interface Topic {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	skill: Skill;
	createdAt?: string;
	updatedAt?: string;
}

export interface GetTopicsListParamsRequest {
	page?: number;
	limit?: number;
	title?: string;
	skillIds?: number[];
}

export type CreateOrEditTopicFormValues = Pick<Topic, 'id' | 'title' | 'description'> & {
	skillId: number;
};
export type GetTopicsListResponse = Response<Topic[]>;
