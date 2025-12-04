import { CreateOrEditTopicFormValues, Topic } from '@/entities/topic';

export type CreateTopicFormValues = Omit<CreateOrEditTopicFormValues, 'id'>;

export type CreateTopicBodyRequest = CreateTopicFormValues;
export type CreateTopicResponse = Topic;
