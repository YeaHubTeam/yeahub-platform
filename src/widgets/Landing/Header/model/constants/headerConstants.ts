import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';

import { HeaderNavLinks } from '../types/headerTypes';

export const HEADER_NAV_LINKS: HeaderNavLinks[] = [
	{
		link: ROUTES.questions.page,
		path: '/questions/',
		title: Landing.HEADER_NAV_QUESTIONS_LIST,
	},
	{
		link: ROUTES.quiz.page,
		path: '/quiz/',
		title: Landing.HEADER_NAV_PUBLIC_QUIZ,
	},
];
