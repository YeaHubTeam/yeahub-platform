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
	{
		link: ROUTES.collections.page,
		path: '/collections/',
		title: Landing.HEADER_NAV_PUBLIC_COLLECTIONS,
	},
	{
		link: ROUTES.resources.page,
		path: '/resources/',
		title: Landing.HEADER_NAV_PUBLIC_RESOURCES,
	},
];

export const HEADER_NAV_LINKS_AUTH: HeaderNavLinks[] = [
	{
		link: ROUTES.interview.questions.page,
		path: '/dashboard/interview/questions',
		title: Landing.HEADER_NAV_QUESTIONS_LIST,
	},
	{
		link: ROUTES.interview.quiz.page,
		path: '/dashboard/interview/quiz',
		title: Landing.HEADER_NAV_PUBLIC_QUIZ,
	},
	{
		link: ROUTES.interview.collections.page,
		path: '/dashboard/interview/collections',
		title: Landing.HEADER_NAV_PUBLIC_COLLECTIONS,
	},
	{
		link: ROUTES.wiki.resources.page,
		path: '/dashboard/resources',
		title: Landing.HEADER_NAV_PUBLIC_RESOURCES,
	},
];
