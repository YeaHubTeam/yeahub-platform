import { createTopicMock } from './api/__mock__/createTopicMock';

export { useCreateTopicMutation } from './api/createTopicApi';
export { TopicCreateForm } from './ui/TopicCreateForm/TopicCreateForm';

export const createTopicHandlers = [createTopicMock];
