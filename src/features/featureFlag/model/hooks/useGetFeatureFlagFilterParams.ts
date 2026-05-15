import { GetFeatureFlagsListParamsRequest } from '@/entities/featureFlag';

export const useGetFeatureFlagFilterParams = (initialParams: GetFeatureFlagsListParamsRequest) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: GetFeatureFlagsListParamsRequest = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
	};

	return currentParams;
};
