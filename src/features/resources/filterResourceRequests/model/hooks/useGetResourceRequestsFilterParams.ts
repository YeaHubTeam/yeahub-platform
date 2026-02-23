import { ResourceTypeCode } from '@/entities/resource';

import { ResourceRequestsFilterParams } from '../types/filters';

export const useGetResourceRequestsFilterParams = (initialParams: ResourceRequestsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: ResourceRequestsFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		title: parsedParams.title || initialParams.title,
		types: parsedParams.types
			? (parsedParams.types.split(',') as ResourceTypeCode[])
			: initialParams.types,
		status: (parsedParams.status as ResourceRequestsFilterParams['status']) || initialParams.status,
		skills: parsedParams.skills ? parsedParams.skills.split(',').map(Number) : initialParams.skills,
		isMy: parsedParams.isMy === 'true' ? !!parsedParams.isMy : initialParams.isMy,
	};

	return currentParams;
};
