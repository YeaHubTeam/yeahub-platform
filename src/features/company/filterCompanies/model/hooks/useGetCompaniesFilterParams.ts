import { CompaniesFilterParams } from '../types/filters';

export const useGetCompaniesFilterParams = (initialParams: CompaniesFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: CompaniesFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		title: parsedParams.title || initialParams.title,
		authorId: parsedParams.authorId || initialParams.authorId,
		isMy: parsedParams.isMy === 'true' ? true : initialParams.isMy,
	};

	return currentParams;
};
