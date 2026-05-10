import { DefaultBodyType, http, HttpResponse, PathParams } from 'msw';

import { taskApiUrls } from '../../model/constants/task';
import { GetTasksProfileSolutionsResponse } from '../../model/types/task';

import { tasksProfileSolutionsMock } from './data';

export const taskProfileSolutionMock = http.get<
	PathParams,
	DefaultBodyType,
	GetTasksProfileSolutionsResponse
>(`${process.env.API_URL}${taskApiUrls.getTasksProfileSolutions}`, ({ params }) => {
	const { taskId, profileId } = params;

	const filteredSolutions = tasksProfileSolutionsMock.filter(
		(solution) => solution.taskId === taskId && solution.profileId === profileId,
	);

	return HttpResponse.json(filteredSolutions);
});
