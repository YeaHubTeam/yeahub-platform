import { CreateOrEditTopicFormValues, Topic } from '@/entities/topic';

export type EditTopicFormValues = CreateOrEditTopicFormValues;
export type EditTopicBodyRequest = EditTopicFormValues;
export type EditTopicResponse = Topic;
