import { SpecializationsFilterParams } from '../types/filters';

export const useGetSpecializationsFilterParams = (initialParams: SpecializationsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const isMy =
		parsedParams.isMy !== undefined
			? parsedParams.isMy === '1' || parsedParams.isMy === 'true'
			: (initialParams.isMy ?? false);

	const currentParams: SpecializationsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		title: parsedParams.title || initialParams.title,
		author: isMy ? undefined : parsedParams.author || initialParams.author,
		isMy,
	};

	return currentParams;
};
