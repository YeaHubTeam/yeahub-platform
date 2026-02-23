import { createTopicMock } from './api/__mock__/createTopic';

export { useCreateTopicMutation } from './api/createTopicApi';
export { TopicCreateForm } from './ui/TopicCreateForm/TopicCreateForm';

export const createTopicHandlers = [createTopicMock];
