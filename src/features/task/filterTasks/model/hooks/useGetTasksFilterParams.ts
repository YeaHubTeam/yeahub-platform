import type { TaskDifficulty, TasksFilterParams } from '@/entities/task';

export const useGetTasksFilterParams = (initialParams: TasksFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const parsedPage = parsedParams.page ? Number(parsedParams.page) : undefined;
	const parsedTitle = parsedParams.title ? parsedParams.title : undefined;
	const parsedDifficulty = parsedParams.difficulty ? Number(parsedParams.difficulty) : undefined;
	const parsedLangIds = parsedParams.langIds
		? parsedParams.langIds.split(',').map(Number)
		: undefined;

	const currentParams: TasksFilterParams = {
		page: parsedPage || initialParams.page,
		title: parsedTitle || initialParams.title,
		difficulty: (parsedDifficulty as TaskDifficulty) || initialParams.difficulty,
		langIds: parsedLangIds || initialParams.langIds,
	};

	return currentParams;
};
