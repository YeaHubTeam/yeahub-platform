import type { HhAnalyticsFiltersParams, HhAnalyticsMode } from '../types/types';

export const useGetHhAnalyticsFilterParams = (initialParams: HhAnalyticsFiltersParams) => {
	const params = new URLSearchParams(location.search);

	const parsedParams = Object.fromEntries(params.entries());
	const modeParams = parsedParams.mode as HhAnalyticsMode;

	const currentParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		specialization: parsedParams.specialization
			? Number(parsedParams.specialization)
			: initialParams.specialization,
		mode: modeParams ? modeParams : initialParams.mode,
	};

	return currentParams;
};
