import type { TaskDifficulty, TasksFilterParams } from '@/entities/task';

export const useGetTasksFilterParams = (initialParams: TasksFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: TasksFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		title: parsedParams.title ? parsedParams.title : initialParams.title,
		difficulty: parsedParams.difficulty
			? (Number(parsedParams.difficulty) as TaskDifficulty)
			: initialParams.difficulty,
		langIds: parsedParams.langIds
			? parsedParams.langIds.split(',').map(Number)
			: initialParams.langIds,
	};

	return currentParams;
};
