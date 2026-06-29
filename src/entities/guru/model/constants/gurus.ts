import cicd from '@/shared/assets/images/skills/cicd.png';
import css from '@/shared/assets/images/skills/css.png';
import docker from '@/shared/assets/images/skills/docker.png';
import eslint from '@/shared/assets/images/skills/eslint.png';
import html from '@/shared/assets/images/skills/html.png';
import js from '@/shared/assets/images/skills/js.png';
import redux from '@/shared/assets/images/skills/redux.png';
import storybook from '@/shared/assets/images/skills/storybook.png';
import ts from '@/shared/assets/images/skills/ts.png';

import { Guru, NewGuru } from '../types/guru';

export const newGurus: NewGuru[] = [
	{
		specializationTitle: 'Frontend developer',
		specializations: [11],
		title: 'Ментор по Frontend',
		description:
			'Полное сопровождение до оффера — без дорогих курсов, с оплатой после трудоустройства',
		icons: [
			[eslint, null, docker, html],
			[storybook, ts, cicd, css],
			[null, redux, null, js],
		],
	},
];

export const gurus: Guru[] = [
	{
		title: 'Frontend Guru',
		name: 'Ruslan Kuyanets',
		specializations: [11],
		hasPractice: true,
		description:
			'Руководит фронтенд-разработкой платформы, помогает ученикам писать чистый код, разбираться в архитектуре и выпускать фичи в прод.',
		image:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/gurus/%D1%80%D1%83%D1%81%D0%BB%D0%B0%D0%BD%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D1%80%20(1).jpeg',
		socials: {
			telegram: 'https://t.me/reactify_IT',
			youtube: 'https://youtube.com/@reactify-it',
			profileId: '0a1438a3-1776-43b4-9a95-e60ee6573903',
			landing: 'https://t.me/mentor_reactify',
		},
	},
	{
		title: 'Android Guru',
		name: 'Anton Gulyaev',
		specializations: [27],
		hasPractice: true,
		description:
			'Отвечает за мобильную разработку под Android, показывает, как создавать удобные и современные приложения вместе с учениками.',
		image:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/gurus/%D0%90%D0%BD%D1%82%D0%BE%D0%BD%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D1%80.png',
		socials: {
			telegram: 'https://t.me/gulyaev_it',
			youtube: 'https://youtube.com/@gulyaev_it',
			profileId: '9865139a-3656-4781-91a7-fd86a77b7e1e',
			landing: 'https://melon-lilac-c99.notion.site/Android-3554e71b63db4dcc8dd59029d73ba047',
		},
	},
	{
		title: 'Golang Guru',
		name: 'Maxim Lukyanov',
		specializations: [23],
		hasPractice: false,
		description:
			'Следит за качеством контента по Go, обновляет материалы и вопросы, добавляет интервью и развивает направление как эксперт редакции.',
		image: 'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/gurus/Автостоп.jpg',
		socials: {
			telegram: 'https://t.me/Avtostopom_po_G0',
			youtube: 'https://www.youtube.com/@Avtostopom_po_Go',
			profileId: '2350f2b4-d06d-4a8b-b6a6-742c8e0df414',
			landing: 'https://lukyanov.tech/',
		},
	},
	{
		title: 'QA Manual Guru',
		name: 'Ziyaev Ed',
		specializations: [29],
		hasPractice: true,
		description:
			'Ведёт команду тестировщиков, учит находить баги и выстраивать качественный процесс QA, как в настоящей продуктовой компании.',
		image: 'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/gurus/%D1%8D%D0%B41.jpg',
		socials: {
			telegram: 'https://t.me/twitereda',
			youtube: 'https://www.youtube.com/@youtubeeda',
			profileId: '8d66fa66-1437-4365-a6d5-add0686aa6db',
			landing: 'http://edqa.ru',
		},
	},
	{
		title: 'Node.js Guru',
		name: 'Demetra',
		specializations: [21],
		hasPractice: false,
		description:
			'Отвечает за развитие направления по Node.js, следит за качеством контента и материалов, добавляет задачи и вопросы для обучающихся.',
		image:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/gurus/%D0%B4%D0%B5%D0%BC%D0%B5%D1%82%D1%80%D0%B0.jpg',
		socials: {
			telegram: 'https://t.me/DemetraIT',
			profileId: 'c5e0ed42-3c59-4217-9de5-0a240afee6c8',
			landing: 'https://clck.ru/3B9Mdi',
		},
	},
	{
		title: 'System Analysis Guru',
		name: 'Tsarev Andrei',
		specializations: [42, 44],
		hasPractice: true,
		description:
			'Наставляет аналитиков, учит грамотно описывать требования и превращать идеи в понятные задачи для команды.',
		image: 'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/gurus/saguruandrey.jpg',
		socials: {
			telegram: 'https://t.me/notsystemanalysis',
			youtube: 'https://www.youtube.com/@notsystemanalysis',
			profileId: '75ff78e7-89be-47fd-8afa-2ae83ba174c7',
			landing: 'https://notsystemanalysis.ru/',
		},
	},
	{
		title: 'Unity Guru',
		name: 'Oleg Miroshkin',
		specializations: [35],
		hasPractice: false,
		description:
			'Контролирует качество учебных материалов по Unity, обновляет контент и вопросы, развивает направление геймдев-наставничества.',
		image:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/gurus/%D0%BE%D0%BB%D0%B5%D0%B3%D0%B3%D0%B5%D0%B8%CC%86%D0%BC.png',
		socials: {
			telegram: 'https://t.me/+-cgBKDlC6I8zZDdi',
			youtube: 'https://www.youtube.com/@wealthygamedev',
			profileId: '801d60b8-4f72-4180-984d-8d6811c71963',
			landing: 'https://clck.ru/3AZ47b',
		},
	},
	{
		title: 'Python Guru',
		name: 'Sergey Filichkin',
		specializations: [19],
		hasPractice: false,
		description:
			'Редактор и эксперт по Python: следит за качеством контента, добавляет новые материалы и вопросы, поддерживает развитие направления.',
		image: 'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/gurus/pythonserg.png',
		socials: {
			telegram: 'https://link.sergeyfilichkin.ru/gApVDF',
			youtube: 'https://link.sergeyfilichkin.ru/50gs',
			profileId: 'd173ffab-d458-49f4-9368-35336da765ab',
			landing: 'https://www.sergeyfilichkin.ru',
		},
	},
];
