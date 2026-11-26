import { clientTypes } from '@/entities/featureFlag';

import type { FeatureFlagsFilterParams } from '../types/filters';

export const useGetFeatureFlagsFilterParams = (initialParams: FeatureFlagsFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsed = Object.fromEntries(params.entries());

	const currentParams: FeatureFlagsFilterParams = {
		page: parsed.page ? Number(parsed.page) : initialParams.page,
		search: parsed.search || initialParams.search,
		roleIds: parsed.roleIds ? parsed.roleIds.split(',').map(Number) : initialParams.roleIds,
		clientType: clientTypes.find((type) => type === parsed.clientType) ?? initialParams.clientType,
		enabled: parsed.enabled ? parsed.enabled === 'true' : initialParams.enabled,
	};

	return currentParams;
};
