import { ReferralsFilterParams } from '../types/filters';

export const useGetReferralsFilterParams = (initialParams: ReferralsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: ReferralsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
	};

	return currentParams;
};
