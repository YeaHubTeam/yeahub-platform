import { CollectionsFilterParams } from '../types/types';

export const useGetCollectionsFilterParams = (initialParams: CollectionsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: CollectionsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		specialization: parsedParams.specialization
			? Number(parsedParams.specialization)
			: initialParams.specialization,
		isFree: parsedParams.isFree ? Boolean(parsedParams.isFree) : initialParams.isFree,
		title: parsedParams.title || initialParams.title,
	};

	return currentParams;
};
