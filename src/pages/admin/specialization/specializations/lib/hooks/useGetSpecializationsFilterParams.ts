import { SpecializationsFilterParams } from '../../model/types/filters';

export const useGetSpecializationsFilterParams = (initialParams: SpecializationsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: SpecializationsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		title: parsedParams.title || initialParams.title,
		author: parsedParams.author || initialParams.author,
		isMy: parsedParams.isMy === 'true' ? !!parsedParams.isMy : initialParams.isMy,
	};

	return currentParams;
};
