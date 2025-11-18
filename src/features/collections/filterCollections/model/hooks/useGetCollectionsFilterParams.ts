import { CollectionsFilterParams } from '../types/types';

export const useGetCollectionsFilterParams = (initialParams: CollectionsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: CollectionsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		specialization: parsedParams.specialization
			? Number(parsedParams.specialization)
			: initialParams.specialization,
		title: parsedParams.title || initialParams.title,
	};

	const authorId = parsedParams.authorId || initialParams.authorId;
	if (authorId) currentParams.authorId = authorId;

	return currentParams;
};
