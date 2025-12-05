import { CompaniesFilterParams } from '../types/filters';

export const useGetCompaniesFilterParams = (initialParams: CompaniesFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: CompaniesFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		title: parsedParams.title || initialParams.title,
		userId: parsedParams.userId || initialParams.userId,
	};

	return currentParams;
};
