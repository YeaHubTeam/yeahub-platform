import { ClientType } from '../types/featureFlag';

export const featureFlagApiUrls = {
	getFeatureFlagsList: 'feature-flags',
	getFeatureFlagById: 'feature-flags/:flagId',
};

export const clientTypes: ClientType[] = ['WEB', 'IOS', 'ANDROID'];
