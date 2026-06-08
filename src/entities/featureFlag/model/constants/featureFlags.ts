import { FeatureFlags, ClientType } from '../types/featureFlag';

export const featureFlags: FeatureFlags = {
	nyBanner: {
		id: 'nyBanner',
		enabled: false,
		description: 'Новогодний баннер со скидками на подписку',
	},
};

export const featureFlagApiUrls = {
	getFeatureFlagsList: 'feature-flags',
	getFeatureFlagById: 'feature-flags/:flagId',
};

export const clientTypes: ClientType[] = ['WEB', 'IOS', 'ANDROID'];
