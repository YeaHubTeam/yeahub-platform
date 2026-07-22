import { Response } from '@/shared/libs';
import { Author } from '@/shared/ui/AuthorInfo';

import type { Skill } from '@/entities/skill/@x/topic';

export interface Topic {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	skill: Skill;
	createdBy?: Author;
	createdAt: string;
	updatedAt: string;
	disabled?: boolean;
}

export interface GetTopicsListParamsRequest {
	page?: number;
	limit?: number;
	title?: string;
	skillIds?: number[];
}

export interface GetTopicByIdParamsRequest {
	topicId: number;
}

export type CreateOrEditTopicFormValues = Pick<Topic, 'id' | 'title' | 'description'> & {
	skillId: number;
};

export type GetTopicsListResponse = Response<Topic[]>;
export type GetTopicByIdResponse = Topic;
