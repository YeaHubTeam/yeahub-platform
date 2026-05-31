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
			id: '67003559-016b-4444-a1c4-9287dcfdfa50',
			flag: 'dashboard.analytic.user-rating',
			enabled: false,
			description: 'Фича флаг для показа виджета рейтинга пользователей',
			roles: ['admin'],
			clientType: 'WEB',
			createdAt: '2026-05-28T09:47:20.801Z',
			updatedAt: '2026-05-30T16:21:49.626Z',
		},
		{
			id: 'changeTheme',
			flag: 'Смена темы',
			enabled: true,
			description: 'Переключение светлой/темной темы',
			roles: ['admin', 'author'],
			clientType: 'WEB',
			createdAt: '2025-01-10T00:00:00.000Z',
			updatedAt: '2025-01-10T00:00:00.000Z',
		},
	],
	page: 1,
	limit: 10,
	total: 4,
};
