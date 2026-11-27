import { ClientType } from '../types/featureFlag';

export const featureFlagApiUrls = {
	getFeatureFlagsList: 'feature-flags',
};

export const clientTypes: ClientType[] = ['WEB', 'IOS', 'ANDROID'];
export const FEATURE_FLAG_DESCRIPTION_LIMIT = 1000;
