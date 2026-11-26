import type { ClientType } from '@/entities/featureFlag';

import type { FeatureFlagsFilterParams } from '../types/filters';

export const DEFAULT_CLIENT_TYPE: ClientType = 'WEB';

export const DEFAULT_FILTERS: FeatureFlagsFilterParams = {
	page: 1,
	clientType: DEFAULT_CLIENT_TYPE,
};
