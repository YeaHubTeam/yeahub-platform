import image1 from '@/shared/assets/images/landing/train-image1.jpg';
import image2 from '@/shared/assets/images/landing/train-image2.jpg';
import image3 from '@/shared/assets/images/landing/train-image3.jpg';
import image4 from '@/shared/assets/images/landing/train-image4.jpg';

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
		title: 'Что такое Virtual DOM, и как он работает?',
		rating: '4',
		difficulty: '10',
		image: image1,
	},
	{
		id: '2',
		title: 'Какие типы данных есть в JS?',
		rating: '3',
		difficulty: '2',
		image: image2,
	},
	{
		id: '3',
		title: 'Что такое this?',
		rating: '4',
		difficulty: '5',
		image: image3,
	},
	{
		id: '4',
		title: 'Что такое замыкание в JavaScript?',
		rating: '4',
		difficulty: '4',
		image: image4,
	},
];
