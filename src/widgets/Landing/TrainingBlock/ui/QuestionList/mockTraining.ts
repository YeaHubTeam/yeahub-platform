import image1 from '@/shared/assets/images/landing/train-image1.avif';
import image2 from '@/shared/assets/images/landing/train-image2.avif';
import image3 from '@/shared/assets/images/landing/train-image3.avif';
import image4 from '@/shared/assets/images/landing/train-image4.avif';
import i18n, { i18Namespace } from '@/shared/config/i18n/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

export interface MockTraining {
	id: string;
	title: string;
	rating: string;
	difficulty: string;
	image: string;
	alt: string;
}

export const mockTraining: Array<MockTraining> = [
	{
		id: '1',
		title: i18n.t(Landing.QUESTIONS_FIRST, { ns: i18Namespace.landing }),
		rating: '4',
		difficulty: '10',
		image: image1,
		alt: 'Backend: Node.js, PHP, Python, Golang, Java, Rust',
	},
	{
		id: '2',
		title: i18n.t(Landing.QUESTIONS_SECOND_TITLE, { ns: i18Namespace.landing }),
		rating: '3',
		difficulty: '2',
		image: image2,
		alt: 'DevOps: Docker, Kubernetes, CI/CD, GitHub',
	},
	{
		id: '3',
		title: i18n.t(Landing.QUESTIONS_THIRD, { ns: i18Namespace.landing }),
		rating: '4',
		difficulty: '5',
		image: image3,
		alt: 'Frontend: HTML, CSS, JavaScript, React',
	},
	{
		id: '4',
		title: i18n.t(Landing.QUESTIONS_FOURTH, { ns: i18Namespace.landing }),
		rating: '4',
		difficulty: '4',
		image: image4,
		alt: 'Вопросы и собеседования для Junior',
	},
];
