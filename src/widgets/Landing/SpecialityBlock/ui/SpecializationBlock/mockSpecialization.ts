import { Landing } from '@/shared/config';

import {
	androidDev,
	backend,
	dataScience,
	frontend,
	gameDev,
	iosDev,
	machineLearning,
	testing,
} from '../../model/assets';

export interface IMockSpeciality {
	id?: number;
	title: string;
	description: string;
	image: string;
	alt?: string;
	link?: string;
}

export const mockSpecialization: Array<IMockSpeciality> = [
	{
		id: 1,
		title: 'Frontend',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_FRONTEND,
		image: frontend,
		alt: Landing.SPECIALIZATION_CARD_IMG_FRONTEND,
		link: '/questions?page=1&status=all&specialization=11&skills=6',
	},
	{
		id: 2,
		title: 'Backend',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_BACKEND,
		image: backend,
		alt: Landing.SPECIALIZATION_CARD_IMG_BACKEND,
		link: '/questions?page=1&status=all&specialization=19&skills=33',
	},
	{
		id: 3,
		title: 'Data Science',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_DATA,
		image: dataScience,
		alt: Landing.SPECIALIZATION_CARD_IMG_DATA,
		link: '/questions?page=1&status=all&specialization=34&skills=64',
	},
	{
		id: 4,
		title: 'Machine Learning',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_MACHINE,
		image: machineLearning,
		alt: Landing.SPECIALIZATION_CARD_IMG_MACHINE,
		link: '/questions?page=1&status=all&specialization=37&skills=33',
	},
	{
		id: 5,
		title: 'Testing',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_TESTING,
		image: testing,
		alt: Landing.SPECIALIZATION_CARD_IMG_TESTING,
		link: '/questions?page=1&status=all&specialization=29&skills=46',
	},
	{
		id: 6,
		title: 'iOS Dev',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_IOS,
		image: iosDev,
		alt: Landing.SPECIALIZATION_CARD_IMG_IOS,
		link: '/questions?page=1&status=all&specialization=26&skills=44',
	},
	{
		id: 7,
		title: 'Android Dev',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_ANDROID,
		image: androidDev,
		alt: Landing.SPECIALIZATION_CARD_IMG_ANDROID,
		link: '/questions?page=1&status=all&specialization=27&skills=45',
	},
	{
		id: 8,
		title: 'Game Dev',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_GAME,
		image: gameDev,
		alt: Landing.SPECIALIZATION_CARD_IMG_GAME,
		link: '/questions?page=1&status=all&specialization=35&skills=58',
	},
];
