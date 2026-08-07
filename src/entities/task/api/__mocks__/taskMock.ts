import { DefaultBodyType, http, HttpResponse } from 'msw';

import { taskApiUrls } from '../../model/constants/task';
import { GetTaskByIdParamsRequest, GetTaskByIdResponse } from '../../model/types/task';

import { tasksMock } from './data';

export const taskByIdMock = http.get<
	Record<keyof GetTaskByIdParamsRequest, string>,
	DefaultBodyType,
	GetTaskByIdResponse | { error: string }
>(`${process.env.API_URL}${taskApiUrls.getTaskById}`, ({ params }) => {
	const { taskId } = params;

	const task = tasksMock.find((t) => String(t.id) === taskId);

	if (!task) {
		return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
	}

	return HttpResponse.json(task);
});
