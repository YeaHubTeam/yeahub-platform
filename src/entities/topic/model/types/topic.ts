import { Response } from '@/shared/libs';
import { Author } from '@/shared/ui/AuthorInfo';

import { Skill } from '@/entities/skill/@x/topic';

export interface Topic {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	skill: Skill;
	createdAt?: string;
	updatedAt?: string;
	createdBy: Author;
	updatedBy: Author | null;
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

export type GetTopicByIdResponse = Topic;

export type GetTopicByIdParamsRequest = {
	topicId?: string;
};

export type GetTopicsListResponse = Response<Topic[]>;
export type TopicRequestFormValues = CreateOrEditTopicFormValues;
