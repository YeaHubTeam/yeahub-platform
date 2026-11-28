import { Topic } from '@/entities/topic';

export interface CreateTopicFormValues {
	title: string;
	description: string;
	skillId: number;
}

export type CreateTopicBodyRequest = CreateTopicFormValues;

export type CreateTopicResponse = Topic;

export type CreateTopicError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.admin_or_author_required'
	| 'topic.topic.title.conflict';
