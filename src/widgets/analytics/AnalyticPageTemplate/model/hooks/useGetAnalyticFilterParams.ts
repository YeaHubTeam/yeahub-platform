import { AnalyticFilterParams } from '../types/types';

export const useGetAnalyticFilterParams = (initialParams: AnalyticFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: AnalyticFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		specialization: parsedParams.specialization
			? Number(parsedParams.specialization)
			: initialParams.specialization,
		skill: parsedParams.skill ? Number(parsedParams.skill) : initialParams.skill,
	};

	return currentParams;
};
