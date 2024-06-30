import { InterviewQuestionsItem } from '../InterviewQuestionsItem/InterviewQuestionsItem';

import styles from './InterviewQuestionsList.module.css';

// временные данные
const interviewQuestionsData = [
	{
		id: 1,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer: '2+2=4',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	{
		id: 2,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc: '',
		keywords: ['javascript'],
		shortAnswer: '2+2=4',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
	{
		id: 3,
		title: 'Что такое Virtual DOM, и как он работает?',
		description: 'What is a Virtual DOM and how it works?',
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		keywords: ['javascript'],
		shortAnswer: '2+2=4',
		longAnswer: '2+2=4',
		status: 'draft',
		rate: 8,
		rating: 10,
		specializations: [1, 3],
		skills: [10, 23],
	},
];

export const InterviewQuestionsList = () => {
	return (
		<ul className={styles.list}>
			{interviewQuestionsData.map((question) => (
				<InterviewQuestionsItem key={question.id} question={question} />
			))}
		</ul>
	);
};
