import { FeatureFlags, ClientType } from '../types/featureFlag';

export const featureFlags: FeatureFlags = {
	nyBanner: {
		id: 'nyBanner',
		enabled: false,
		description: 'Новогодний баннер со скидками на подписку',
	},
	nyModal: {
		id: 'nyModal',
		enabled: false,
		description: 'Новогодняя модалка со скидками на подписку',
	},
	changeLanguage: {
		id: 'changeLanguage',
		enabled: true,
		description: 'Переключатель смены языка',
		roles: ['admin'],
	},
};

export const featureFlagApiUrls = {
	getFeatureFlagsList: 'feature-flags',
	getFeatureFlagById: 'feature-flags/:flagId',
};

export const clientTypes: ClientType[] = ['WEB', 'IOS', 'ANDROID'];
