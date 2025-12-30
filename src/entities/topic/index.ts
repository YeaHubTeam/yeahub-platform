export { TopicForm } from './ui/TopicForm/TopicForm';
export { useGetTopicsListQuery, useGetTopicByIdQuery } from './api/topicApi';
// export { TopicAdditionalInfo } from './ui/TopicAdditionalInfo/TopicAdditionalInfo';
// export { TopicAdditionalInfoSkeleton } from './ui/TopicAdditionalInfo/TopicAdditionalInfo.skeleton';

export type {
	Topic,
	CreateOrEditTopicFormValues,
	TopicRequestFormValues,
} from './model/types/topic';
