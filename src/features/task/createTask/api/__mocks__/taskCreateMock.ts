import { http, HttpResponse } from 'msw';

import { companiesMock } from '@/entities/company';
import { ProgrammingLanguage } from '@/entities/programmingLanguage';
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

	const supportedLanguages = body.taskStructures
		.map((item) =>
			Object.values(programmingLanguagesMock).find((lang) => lang.id === item.languageId),
		)
		.filter((lang): lang is ProgrammingLanguage => lang !== undefined);

	const newTask: Task = {
		id: String(Date.now()),
		name: body.name,
		slug: body.name.toLowerCase(),
		description: body.description,
		status: 'attempted',
		difficulty: body.difficulty,
		supportedLanguages,
		mainCategory: body.categoryCode,
		constraints: body.constraints,
		testCases: [],
		taskStructures: body.taskStructures,
		solutionSignature: 'function solution() {\n\n}',
		timeLimit: 1000,
		memoryLimit: 256,
		canSolve: true,
		subscriptionLevel: body.subscriptionLevel,
		companies: companiesMock.data.slice(2, 5),
	};

	tasksMock.push(newTask);

	return HttpResponse.json(newTask, { status: 201 });
});
