import { topicListMock } from '../../api/__mock__/topicListMock';
import { topicByIdMock } from '../../api/__mock__/topicMock';

import { createTopicMock } from './createTopic';

export const topicHandlers = [topicListMock, topicByIdMock, createTopicMock];
