import { DefaultBodyType, http, HttpResponse } from 'msw';

import { taskApiUrls } from '../../model/constants/task';
import { GetTaskCategoriesResponse } from '../../model/types/task';

import { taskCategoriesMock } from './data';

export const taskCategoryMock = () =>
	http.get<Record<string, string>, DefaultBodyType, GetTaskCategoriesResponse>(
		process.env.API_URL + taskApiUrls.getTaskCategories,
		() => {
			return HttpResponse.json(taskCategoriesMock);
		},
	);
