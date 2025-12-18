import { TopicsFilterParams } from '../types/filters';

export const useGetTopicsFilterParams = (initialParams: TopicsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: TopicsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		title: parsedParams.title || initialParams.title,
		skillIds: parsedParams.skillIds ? parsedParams.skillIds.split(',').map(Number) : undefined,
	};

	return currentParams;
};
