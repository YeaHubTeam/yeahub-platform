import { FeatureFlags, ClientType } from '../types/featureFlag';

export const featureFlags: FeatureFlags = {
	nyModal: {
		id: 'nyModal',
		enabled: false,
		description: 'Новогодняя модалка со скидками на подписку',
	},
	usersRating: {
		id: 'usersRating',
		enabled: false,
		description: 'Рейтинг пользователей по изучению вопросов',
	},
	changeLanguage: {
		id: 'changeLanguage',
		enabled: true,
		description: 'Переключатель смены языка',
		roles: ['admin'],
	},
	changeTheme: {
		id: 'changeTheme',
		enabled: true,
		description: 'Переключатель смены темы',
		roles: ['admin'],
	},
};

export const featureFlagApiUrls = {
	getFeatureFlagsList: 'feature-flags',
	getFeatureFlagById: 'feature-flags/:flagId',
};

export const clientTypes: ClientType[] = ['WEB', 'IOS', 'ANDROID'];
