import { FeatureFlags } from '../types/featureFlag';

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
