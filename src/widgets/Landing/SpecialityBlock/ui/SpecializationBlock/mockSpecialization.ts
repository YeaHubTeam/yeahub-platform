import i18n, { i18Namespace } from '@/shared/config/i18n/i18n';
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
}

export const mockSpecialization: Array<IMockSpeciality> = [
	{
		id: 1,
		title: 'Frontend',
		description: i18n.t(Landing.SPECIALIZATION_CARD_DESCRIPTION_FRONTEND, {
			ns: i18Namespace.landing,
		}),
		image: frontImg,
		alt: i18n.t(Landing.SPECIALIZATION_CARD_IMG_FRONTEND, { ns: i18Namespace.landing }),
	},
	{
		id: 2,
		title: 'Backend',
		description: i18n.t(Landing.SPECIALIZATION_CARD_DESCRIPTION_BACKEND, {
			ns: i18Namespace.landing,
		}),
		image: backImg,
		alt: i18n.t(Landing.SPECIALIZATION_CARD_IMG_BACKEND, { ns: i18Namespace.landing }),
	},
	{
		id: 3,
		title: 'Data Science',
		description: i18n.t(Landing.SPECIALIZATION_CARD_DESCRIPTION_DATA, { ns: i18Namespace.landing }),
		image: dsImg,
		alt: i18n.t(Landing.SPECIALIZATION_CARD_IMG_DATA, { ns: i18Namespace.landing }),
	},
	{
		id: 4,
		title: 'Machine Learning',
		description: i18n.t(Landing.SPECIALIZATION_CARD_DESCRIPTION_MACHINE, {
			ns: i18Namespace.landing,
		}),
		image: mlImg,
		alt: i18n.t(Landing.SPECIALIZATION_CARD_IMG_MACHINE, { ns: i18Namespace.landing }),
	},
	{
		id: 5,
		title: 'Testing',
		description: i18n.t(Landing.SPECIALIZATION_CARD_DESCRIPTION_TESTING, {
			ns: i18Namespace.landing,
		}),
		image: testingImg,
		alt: i18n.t(Landing.SPECIALIZATION_CARD_IMG_TESTING, { ns: i18Namespace.landing }),
	},
	{
		id: 6,
		title: 'iOS Dev',
		description: i18n.t(Landing.SPECIALIZATION_CARD_DESCRIPTION_IOS, { ns: i18Namespace.landing }),
		image: iosImg,
		alt: i18n.t(Landing.SPECIALIZATION_CARD_IMG_IOS, { ns: i18Namespace.landing }),
	},
	{
		id: 7,
		title: 'Android Dev',
		description: i18n.t(Landing.SPECIALIZATION_CARD_DESCRIPTION_ANDROID, {
			ns: i18Namespace.landing,
		}),
		image: androidImg,
		alt: i18n.t(Landing.SPECIALIZATION_CARD_IMG_ANDROID, { ns: i18Namespace.landing }),
	},
	{
		id: 8,
		title: 'Game Dev',
		description: i18n.t(Landing.SPECIALIZATION_CARD_DESCRIPTION_GAME, { ns: i18Namespace.landing }),
		image: gameImg,
		alt: i18n.t(Landing.SPECIALIZATION_CARD_IMG_GAME, { ns: i18Namespace.landing }),
	},
];
