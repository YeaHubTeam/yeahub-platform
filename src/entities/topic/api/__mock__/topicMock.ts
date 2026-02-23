import { DefaultBodyType, http, HttpResponse } from 'msw';

import { topicApiUrl } from '../../model/constants/topicConstants';
import type { GetTopicByIdParamsRequest, GetTopicByIdResponse } from '../../model/types/topic';
import { topicsMocks } from '../__mock__/data/topicsMocs';

export const topicByIdMock = http.get<
	Record<keyof GetTopicByIdParamsRequest, string>,
	DefaultBodyType,
	GetTopicByIdResponse
>(`${process.env.API_URL}${topicApiUrl.getTopicById}`, ({ params }) => {
	const { topicId } = params;

	const topic = topicsMocks.data.find((topic) => String(topic.id) === topicId);

	return HttpResponse.json(topic);
});
