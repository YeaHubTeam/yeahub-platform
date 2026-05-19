import { ClientType } from '@/entities/featureFlag';

import { FeatureFlagFiltersParams } from '../types/filters';

export const useGetFeatureFlagFilterParams = (initialParams: FeatureFlagFiltersParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: FeatureFlagFiltersParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		search: parsedParams.search,
		enabled: parsedParams.enabled ? parsedParams.enabled === 'true' : initialParams.enabled,
		selectedRoles: parsedParams.selectedRoles
			? parsedParams.selectedRoles.split(',').map(Number)
			: initialParams.selectedRoles,
		clientType: parsedParams.clientType as ClientType,
	};

	return currentParams;
};
