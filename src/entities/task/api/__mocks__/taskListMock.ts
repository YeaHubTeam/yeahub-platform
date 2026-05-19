import { http, HttpResponse } from 'msw';

import { taskApiUrls } from '../../model/constants/task';
import { GetTasksListResponse } from '../../model/types/task';

import { tasksMock } from './data';

export const taskListMock = http.get<Record<string, never>, never, GetTasksListResponse>(
	`${process.env.API_URL}${taskApiUrls.getTasksList}`,
	({ request }) => {
		const url = new URL(request.url);

		const page = Number(url.searchParams.get('page') ?? 1);
		const limit = Number(url.searchParams.get('limit') ?? 10);
		const difficulty = url.searchParams.get('difficulty');
		const langIds = url.searchParams.get('langIds');

		const filteredTasks = tasksMock.filter((task) => {
			const byDifficulty = difficulty ? String(task.difficulty) === difficulty : true;

			const byLanguage = langIds
				? task.supportedLanguages.some(({ id }) => langIds.includes(String(id)))
				: true;

			return byDifficulty && byLanguage;
		});

		const paginationData = filteredTasks.slice((page - 1) * limit, page * limit);

		const response: GetTasksListResponse = {
			data: paginationData,
			limit: limit,
			total: filteredTasks.length,
			page: page,
		};

		return HttpResponse.json(response);
	},
);
