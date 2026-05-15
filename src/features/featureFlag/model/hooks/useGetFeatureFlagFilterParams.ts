import { FeatureFlagFiltersParams } from '../types/filters';

export const useGetFeatureFlagFilterParams = (initialParams: FeatureFlagFiltersParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: FeatureFlagFiltersParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
	};

	return currentParams;
};
