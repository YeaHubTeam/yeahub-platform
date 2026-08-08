import { http, HttpResponse } from 'msw';

import { tasksMock } from '@/entities/task';

import { deleteTaskApiUrls } from '../../model/constants/deleteTaskConstants';

export const deleteTaskMock = http.delete<{ taskId: string }>(
	`${process.env.API_URL}${deleteTaskApiUrls.deleteTask}`,
	({ params }) => {
		const { taskId } = params;
		const foundIndexTask = tasksMock.findIndex((task) => task.id === taskId);

		if (foundIndexTask === -1) {
			return HttpResponse.json({ message: 'Task is not found' }, { status: 404 });
		}

		tasksMock.splice(foundIndexTask, 1);
		return new HttpResponse(null, { status: 200 });
	},
);
