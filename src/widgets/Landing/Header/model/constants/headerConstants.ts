import { Landing, ROUTES } from '@/shared/config';

import { HeaderNavLinks } from '../types/headerTypes';

export const HEADER_NAV_LINKS: HeaderNavLinks[] = [
	{
		link: ROUTES.public.questions.page,
		path: '/questions/',
		title: Landing.HEADER_NAV_QUESTIONS_LIST,
	},
	{
		link: ROUTES.public.quiz.page,
		path: '/quiz/',
		title: Landing.HEADER_NAV_PUBLIC_QUIZ,
	},
	{
		link: ROUTES.public.collections.page,
		path: '/collections/',
		title: Landing.HEADER_NAV_PUBLIC_COLLECTIONS,
	},
	{
		link: ROUTES.public.resources.page,
		path: '/resources/',
		title: Landing.HEADER_NAV_PUBLIC_RESOURCES,
	},
	{
		link: ROUTES.public.learning.page,
		path: '/learning/',
		title: Landing.HEADER_NAV_LEARNING,
	},
	{
		link: ROUTES.public.hhAnalytics.page,
		path: '/hh-analytics/',
		title: Landing.HEADER_NAV_SKILLS,
	},
];

export const HEADER_NAV_LINKS_AUTH: HeaderNavLinks[] = [
	{
		link: ROUTES.wiki.questions.page,
		path: '/interview/questions',
		title: Landing.HEADER_NAV_QUESTIONS_LIST,
	},
	{
		link: ROUTES.interview.quiz.page,
		path: '/interview/quiz',
		title: Landing.HEADER_NAV_PUBLIC_QUIZ,
	},
	{
		link: ROUTES.wiki.collections.page,
		path: '/interview/collections',
		title: Landing.HEADER_NAV_PUBLIC_COLLECTIONS,
	},
	{
		link: ROUTES.wiki.resources.page,
		path: '/resources',
		title: Landing.HEADER_NAV_PUBLIC_RESOURCES,
	},
	{
		link: ROUTES.public.learning.page,
		path: '/learning/',
		title: Landing.HEADER_NAV_LEARNING,
	},
	{
		link: ROUTES.public.hhAnalytics.page,
		path: '/hh-analytics/',
		title: Landing.HEADER_NAV_SKILLS,
	},
];
