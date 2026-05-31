import { Response } from '@/shared/libs';

import { FeatureFlagApiItem } from '../../../model/types/featureFlag';

export const featureFlagsMock: Response<FeatureFlagApiItem[]> = {
	data: [
		{
			id: 'nyBanner',
			flag: 'Новогодний баннер',
			enabled: false,
			description: 'Скидки на подписку для всех новых пользователей',
			roles: ['admin'],
			clientType: 'WEB',
			createdAt: '2025-12-01T00:00:00.000Z',
			updatedAt: '2025-12-01T00:00:00.000Z',
		},
		{
			id: 'nyModal',
			flag: 'Новогодняя модалка',
			enabled: false,
			description: 'Попап-акция в начале года',
			roles: ['admin'],
			clientType: 'WEB',
			createdAt: '2025-12-01T00:00:00.000Z',
			updatedAt: '2025-12-01T00:00:00.000Z',
		},
		{
			id: 'usersRating',
			flag: 'Рейтинг пользователей',
			enabled: true,
			description: 'Включает рейтинг в профиле',
			roles: ['admin', 'author'],
			clientType: 'WEB',
			createdAt: '2025-01-10T00:00:00.000Z',
			updatedAt: '2025-01-10T00:00:00.000Z',
		},
		{
			id: '7ec45ade-cd54-4f6e-bdf5-4e4e7a2000bc',
			flag: 'common.app.change-theme',
			enabled: true,
			description: 'Фича флаг переключения темы экрана',
			roles: ['admin'],
			clientType: 'WEB',
			createdAt: '2026-05-28T16:16:43.970Z',
			updatedAt: '2026-05-30T16:13:54.178Z',
		},
	],
	page: 1,
	limit: 10,
	total: 4,
};
