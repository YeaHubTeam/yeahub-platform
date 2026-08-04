import { DefaultBodyType, http, HttpResponse } from 'msw';

import { taskApiUrls } from '../../model/constants/task';
import { GetTaskByIdParamsRequest, GetTaskByIdResponse } from '../../model/types/task';

import { tasksMock } from './data';

export const taskByIdMock = http.get<
	Record<keyof GetTaskByIdParamsRequest, string>,
	DefaultBodyType,
	GetTaskByIdResponse
>(`${process.env.API_URL}${taskApiUrls.getTaskById}`, ({ params }) => {
	const { taskId } = params;

	const task = tasksMock.find((t) => String(t.id) === taskId);

	return HttpResponse.json(task);
});
