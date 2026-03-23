import { DefaultBodyType, http, HttpResponse, PathParams } from 'msw';

import { route } from '@/shared/libs';

import { taskApiUrls } from '../../model/constants/task';
import { GetTasksProfileSolutionsResponse } from '../../model/types/task';

import { tasksProfileSolutionsMock } from './data';

export const taskProfileSolutionMock = () =>
	http.get<PathParams, DefaultBodyType, GetTasksProfileSolutionsResponse>(
		`${process.env.API_URL}${route(taskApiUrls.getTasksProfileSolutions, ':taskId', ':profileId')}`,
		({ params }) => {
			const { taskId, profileId } = params;

			const filteredSolutions = tasksProfileSolutionsMock.filter(
				(solution) => solution.taskId === taskId && solution.profileId === profileId,
			);

			return HttpResponse.json(filteredSolutions);
		},
	);
