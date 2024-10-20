import InterviewIcon from '@/shared/assets/icons/interview.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { ROUTES } from '@/shared/config/router/routes';

import { MenuItem } from '../types/sidebar';

export const sidebarMenuListMock: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.appRoute,
		title: 'Главная',
		icon: MainIcon,
	},
	{
		type: 'single',
		route: ROUTES.profile.route,
		title: 'Мой профиль',
		icon: ProfileIcon,
	},
	{
		type: 'single',
		route: ROUTES.interview.route,
		title: 'Собеседование',
		icon: InterviewIcon,
	},
];
