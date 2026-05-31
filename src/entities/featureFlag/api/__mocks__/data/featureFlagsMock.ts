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
			id: 'changeTheme',
			flag: 'Смена темы',
			enabled: true,
			description: 'Переключение светлой/темной темы',
			roles: ['admin', 'author'],
			clientType: 'WEB',
			createdAt: '2025-01-10T00:00:00.000Z',
			updatedAt: '2025-01-10T00:00:00.000Z',
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
