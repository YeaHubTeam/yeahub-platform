import image1 from '@/shared/assets/images/landing/train-image1.png';
import image2 from '@/shared/assets/images/landing/train-image2.png';
import image3 from '@/shared/assets/images/landing/train-image3.png';
import image4 from '@/shared/assets/images/landing/train-image4.png';
import i18n, { i18Namespace } from '@/shared/config/i18n/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

export interface MockTraining {
	id: string;
	title: string;
	rating: string;
	difficulty: string;
	image: string;
}

export const mockTraining: Array<MockTraining> = [
	{
		id: '1',
		title: i18n.t(Landing.QUESTIONS_FIRST, { ns: i18Namespace.landing }),
		rating: '4',
		difficulty: '10',
		image: image1,
	},
	{
		id: '2',
		title: i18n.t(Landing.QUESTIONS_SECOND_TITLE, { ns: i18Namespace.landing }),
		rating: '3',
		difficulty: '2',
		image: image2,
	},
	{
		id: '3',
		title: i18n.t(Landing.QUESTIONS_THIRD, { ns: i18Namespace.landing }),
		rating: '4',
		difficulty: '5',
		image: image3,
	},
	{
		id: '4',
		title: i18n.t(Landing.QUESTIONS_FOURTH, { ns: i18Namespace.landing }),
		rating: '4',
		difficulty: '4',
		image: image4,
	},
];
