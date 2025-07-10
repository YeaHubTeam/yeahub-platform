import Crown from '@/shared/assets/icons/crown.svg';
import CursorSquare from '@/shared/assets/icons/cursorSquare.svg';
import EducationIcon from '@/shared/assets/icons/education.svg';
import Home from '@/shared/assets/icons/home.svg';
import InterviewIcon from '@/shared/assets/icons/interview.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import QuestionsIcon from '@/shared/assets/icons/questions.svg';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';

import { MenuItem } from '@/widgets/Sidebar';
import { SingleMenuItem } from '@/widgets/Sidebar/model/types/sidebar';

export const sidebarUserMenuMock: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.platformRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_MAIN),
		icon: MainIcon,
	},
	{
		type: 'category',
		title: i18n.t(Translation.SIDEBAR_MENU_EDUCATION_TITLE),
		icon: EducationIcon,
		elements: [
			{
				route: ROUTES.interview.route,
				title: i18n.t(Translation.SIDEBAR_MENU_EDUCATION_INTERVIEW),
				icon: InterviewIcon,
			},
		],
	},
];

export const profileMenuItemMock: SingleMenuItem = {
	type: 'single',
	route: ROUTES.profile.route,
	title: i18n.t(Translation.PROFILE),
	icon: ProfileIcon,
};

export const sidebarAdminPlatformMenuMock: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.adminRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_ADMIN),
		icon: Crown,
		isAdmin: true,
	},
	...sidebarUserMenuMock,
];

export const sidebarAdminEditorMenuMock: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.platformRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_PLATFORM),
		icon: CursorSquare,
		isAdmin: true,
	},
	{
		type: 'single',
		route: ROUTES.adminRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_MAIN),
		icon: Home,
	},
	{
		type: 'single',
		route: ROUTES.admin.questions.route,
		title: i18n.t(Translation.SIDEBAR_MENU_QUESTIONS),
		icon: QuestionsIcon,
	},
];
