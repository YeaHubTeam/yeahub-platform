import InterviewIcon from '@/shared/assets/icons/interview.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { ROUTES } from '@/shared/config/router/routes';

export const sidebarMenuListMock = [
	{
		route: ROUTES.appRoute,
		title: 'Главная',
		icon: MainIcon,
	},
	{
		route: ROUTES.profile.route,
		title: 'Мой профиль',
		icon: ProfileIcon,
	},
	{
		route: ROUTES.interview.route,
		title: 'Собеседование',
		icon: InterviewIcon,
	},
];
