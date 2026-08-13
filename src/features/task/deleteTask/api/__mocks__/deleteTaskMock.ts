import { http, HttpResponse, DefaultBodyType } from 'msw';

import { tasksMock } from '@/entities/task';

import { deleteTaskApiUrls } from '../../model/constants/deleteTaskConstants';

export const deleteTaskMock = http.delete<
	{ taskId: string },
	DefaultBodyType,
	ApiErrorData<string>
>(`${process.env.API_URL}${deleteTaskApiUrls.deleteTask}`, ({ params }) => {
	const { taskId } = params;
	const foundIndexTask = tasksMock.findIndex((task) => task.id === taskId);

	if (foundIndexTask === -1) {
		return HttpResponse.json(
			{
				message: 'task.task.not_found',
				statusCode: 404,
				description: 'Task not found',
			},
			{ status: 404 },
		);
	}

	tasksMock.splice(foundIndexTask, 1);
	return new HttpResponse(null, { status: 204 });
});
