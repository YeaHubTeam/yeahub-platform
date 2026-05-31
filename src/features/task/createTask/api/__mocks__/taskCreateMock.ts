import { http, HttpResponse } from 'msw';

import { createSlug } from '@/shared/libs';

import { programmingLanguagesMock } from '@/entities/programmingLanguage';
import { CreateOrEditTaskFormValues, Task, tasksMock } from '@/entities/task';

import { createTaskApiUrls } from '../../model/constants/createTaskConstants';
import { type CreateTaskResponse } from '../../model/types/taskCreateTypes';

export const taskCreateMock = http.post<
	Record<string, never>,
	CreateOrEditTaskFormValues,
	CreateTaskResponse
>(`${process.env.API_URL}${createTaskApiUrls.createTask}`, async ({ request }) => {
	const body = await request.json();

	const {
		name,
		description,
		difficulty,
		categoryCode,
		constraints,
		taskStructures,
		subscriptionLevel,
	} = body;

	const languagesIds = taskStructures.map(({ languageId }) => languageId);
	const supportedLanguages = Object.values(programmingLanguagesMock).filter(({ id }) =>
		languagesIds.includes(id),
	);

	const newTask: Task = {
		id: crypto.randomUUID(),
		name,
		slug: createSlug(name),
		description,
		status: 'not_started',
		difficulty,
		supportedLanguages,
		mainCategory: categoryCode,
		constraints,
		testCases: [],
		taskStructures,
		solutionSignature: 'function solution() {\n\n}',
		timeLimit: 1000,
		memoryLimit: 256,
		canSolve: true,
		subscriptionLevel,
		companies: [],
	};

	tasksMock.push(newTask);

	return HttpResponse.json(newTask, { status: 201 });
});
