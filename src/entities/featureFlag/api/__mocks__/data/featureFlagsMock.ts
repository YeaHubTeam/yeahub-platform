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
			id: '7ec45ade-cd54-4f6e-bdf5-4e4e7a2000bc',
			flag: 'common.app.change-theme',
			enabled: true,
			description: 'Фича флаг переключения темы экрана',
			roles: ['admin'],
			clientType: 'WEB',
			createdAt: '2026-05-28T16:16:43.970Z',
			updatedAt: '2026-05-30T16:13:54.178Z',
		},
		{
			id: '32a35636-3625-49fd-bb4a-14c2b98a016f',
			flag: 'common.app.change-language',
			enabled: true,
			description: 'Переключатель смены языка ru/en',
			clientType: 'WEB',
			createdAt: '2026-05-28T09:34:05.758Z',
			updatedAt: '2026-05-30T16:26:59.490Z',
			roles: ['admin'],
		},
	],
	page: 1,
	limit: 10,
	total: 4,
};
