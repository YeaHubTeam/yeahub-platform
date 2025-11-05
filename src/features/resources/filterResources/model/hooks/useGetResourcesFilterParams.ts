import { ResourceTypeCode } from '@/entities/resource';

import { ResourcesFilterParams } from '../types/filters';

export const useGetResourcesFilterParams = (initialParams: ResourcesFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: ResourcesFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		specialization: parsedParams.specialization
			? Number(parsedParams.specialization)
			: initialParams.specialization,
		title: parsedParams.title || initialParams.title,
		types: parsedParams.types
			? (parsedParams.types.split(',') as ResourceTypeCode[])
			: initialParams.types,
		skills: parsedParams.skills ? parsedParams.skills.split(',').map(Number) : initialParams.skills,
	};

	return currentParams;
};
