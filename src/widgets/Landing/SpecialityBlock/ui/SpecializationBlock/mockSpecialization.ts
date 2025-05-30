import { Landing } from '@/shared/config/i18n/i18nTranslations';

import androidImg from '@/widgets/Landing/SpecialityBlock/model/assets/Android Dev.avif';
import backImg from '@/widgets/Landing/SpecialityBlock/model/assets/Backend.avif';
import dsImg from '@/widgets/Landing/SpecialityBlock/model/assets/Data Science.avif';
import frontImg from '@/widgets/Landing/SpecialityBlock/model/assets/Frontend.avif';
import gameImg from '@/widgets/Landing/SpecialityBlock/model/assets/Game Dev.avif';
import iosImg from '@/widgets/Landing/SpecialityBlock/model/assets/iOS Dev.avif';
import mlImg from '@/widgets/Landing/SpecialityBlock/model/assets/Machine Learning.avif';
import testingImg from '@/widgets/Landing/SpecialityBlock/model/assets/Testing.avif';

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
		image: frontImg,
		alt: Landing.SPECIALIZATION_CARD_IMG_FRONTEND,
		link: '/questions?page=1&status=all&specialization=11&skills=6',
	},
	{
		id: 2,
		title: 'Backend',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_BACKEND,
		image: backImg,
		alt: Landing.SPECIALIZATION_CARD_IMG_BACKEND,
		link: '/questions?page=1&status=all&specialization=19&skills=33',
	},
	{
		id: 3,
		title: 'Data Science',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_DATA,
		image: dsImg,
		alt: Landing.SPECIALIZATION_CARD_IMG_DATA,
		link: '/questions?page=1&status=all&specialization=34&skills=64',
	},
	{
		id: 4,
		title: 'Machine Learning',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_MACHINE,
		image: mlImg,
		alt: Landing.SPECIALIZATION_CARD_IMG_MACHINE,
		link: '/questions?page=1&status=all&specialization=37&skills=33',
	},
	{
		id: 5,
		title: 'Testing',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_TESTING,
		image: testingImg,
		alt: Landing.SPECIALIZATION_CARD_IMG_TESTING,
		link: '/questions?page=1&status=all&specialization=29&skills=46',
	},
	{
		id: 6,
		title: 'iOS Dev',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_IOS,
		image: iosImg,
		alt: Landing.SPECIALIZATION_CARD_IMG_IOS,
		link: '/questions?page=1&status=all&specialization=26&skills=44',
	},
	{
		id: 7,
		title: 'Android Dev',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_ANDROID,
		image: androidImg,
		alt: Landing.SPECIALIZATION_CARD_IMG_ANDROID,
		link: '/questions?page=1&status=all&specialization=27&skills=45',
	},
	{
		id: 8,
		title: 'Game Dev',
		description: Landing.SPECIALIZATION_CARD_DESCRIPTION_GAME,
		image: gameImg,
		alt: Landing.SPECIALIZATION_CARD_IMG_GAME,
		link: '/questions?page=1&status=all&specialization=35&skills=58',
	},
];
