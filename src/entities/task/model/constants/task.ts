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
	lists: Tasks.CATEGORY_LISTS,
	matrices: Tasks.CATEGORY_MATRICES,
	objects: Tasks.CATEGORY_OBJECTS,
	dictionaries: Tasks.CATEGORY_DICTIONARIES,
	stack: Tasks.CATEGORY_STACK,
	queue: Tasks.CATEGORY_QUEUE,
	'linked-lists': Tasks.CATEGORY_LINKED_LISTS,
	trees: Tasks.CATEGORY_TREES,
	graphs: Tasks.CATEGORY_GRAPHS,
	sorting: Tasks.CATEGORY_SORTING,
	search: Tasks.CATEGORY_SEARCH,
	greedy: Tasks.CATEGORY_GREEDY,
	recursion: Tasks.CATEGORY_RECURSION,
	conditions: Tasks.CATEGORY_CONDITIONS,
	loops: Tasks.CATEGORY_LOOPS,
	functions: Tasks.CATEGORY_FUNCTIONS,
	iterators: Tasks.CATEGORY_ITERATORS,
	generators: Tasks.CATEGORY_GENERATORS,
	parsing: Tasks.CATEGORY_PARSING,
	filtering: Tasks.CATEGORY_FILTERING,
	grouping: Tasks.CATEGORY_GROUPING,
	aggregation: Tasks.CATEGORY_AGGREGATION,
	serialization: Tasks.CATEGORY_SERIALIZATION,
	async: Tasks.CATEGORY_ASYNC,
	caching: Tasks.CATEGORY_CACHING,
	pointers: Tasks.CATEGORY_POINTERS,
	patterns: Tasks.CATEGORY_PATTERNS,
};
