import { API_VERSION, Tasks } from '@/shared/config';

import { TaskCategoryCode } from '../types/task';

export const taskApiUrls = {
	getTasksList: `${API_VERSION.V1}/live-coding/tasks`,
	getTaskById: `${API_VERSION.V1}/live-coding/tasks/:taskId`,
	executeCode: `${API_VERSION.V1}/live-coding/tasks/execute`,
	testCode: `${API_VERSION.V1}/live-coding/tasks/test`,
	getTasksProfileSolutions: `${API_VERSION.V1}/live-coding/tasks/:taskId/solutions/:profileId`,
	getTaskCategories: `${API_VERSION.V1}/live-coding/category`,
};

export const taskCategories: Record<TaskCategoryCode, string> = {
	'data-structures': Tasks.CATEGORY_DATA_STRUCTURES,
	algorithms: Tasks.CATEGORY_ALGORITHMS,
	arrays: Tasks.CATEGORY_ARRAYS,
	databases: Tasks.CATEGORY_DATABASES,
	strings: Tasks.CATEGORY_STRINGS,
	'dynamic-programming': Tasks.CATEGORY_DYNAMIC_PROGRAMMING,
};
