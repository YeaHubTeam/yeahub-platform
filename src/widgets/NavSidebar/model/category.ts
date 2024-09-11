import { ROUTES } from '@/shared/config/router/routes';

interface CategoryCounts {
	[key: string]: number;
}

export const categoryTitles = {
	[ROUTES.appRoute]: 'Главная',
	[ROUTES.profile.page]: 'Мой профиль',
	[ROUTES.interview.page]: 'Собеседование',
};

export const categoryCounts: CategoryCounts = {
	profile: 0,
	interview: 0,
};
