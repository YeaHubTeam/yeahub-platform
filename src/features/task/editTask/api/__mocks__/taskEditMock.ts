import { http, HttpResponse } from 'msw';

import { createSlug } from '@/shared/libs';

import { programmingLanguagesMock } from '@/entities/programmingLanguage';
import { tasksMock } from '@/entities/task';

import { editTaskApiUrls } from '../../model/constants/editTaskConstants';
import { EditTaskBodyRequest, EditTaskResponse } from '../../model/types/taskEditTypes';

export const taskEditMock = http.put<
	{ taskId: string },
	EditTaskBodyRequest,
	EditTaskResponse | { message: string }
>(`${process.env.API_URL}${editTaskApiUrls.editTask}`, async ({ params, request }) => {
	const { taskId } = params;
	const body = await request.json();

	const taskIndex = tasksMock.findIndex(({ id }) => id === taskId);

	if (taskIndex === -1) {
		return HttpResponse.json({ message: 'Task not found' }, { status: 404 });
	}

	const {
		name,
		description,
		difficulty,
		categoryCodes,
		constraints,
		taskStructures,
		subscriptionLevel,
	} = body;

	const languageIds = taskStructures.map(({ languageId }) => languageId);
	const supportedLanguages = Object.values(programmingLanguagesMock).filter(({ id }) =>
		languageIds.includes(id),
	);

	const updatedTask: EditTaskResponse = {
		...tasksMock[taskIndex],
		name,
		slug: createSlug(name),
		description,
		difficulty,
		supportedLanguages,
		categories: categoryCodes,
		constraints,
		taskStructures,
		subscriptionLevel,
	};

	tasksMock[taskIndex] = updatedTask;

	return HttpResponse.json(updatedTask, { status: 200 });
});
