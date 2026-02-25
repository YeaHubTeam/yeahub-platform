import { FeatureToggles } from '../types/featureToggle';

export const featureToggles: FeatureToggles = {
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
};
