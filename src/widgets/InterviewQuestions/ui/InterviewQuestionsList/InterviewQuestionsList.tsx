import { InterviewQuestionsItem } from '../InterviewQuestionsItem/InterviewQuestionsItem';

import styles from './InterviewQuestionsList.module.css';

// временные данные
const interviewQuestionsData = [
	{
		id: 1,
		title: 'Что такое Virtual DOM, и как он работает?',
		link: 'question/virtual-dom',
		src: '',
		params: [
			{
				label: 'Рейтинг',
				value: 4,
			},
			{
				label: 'Сложность',
				value: 10,
			},
		],
	},
	{
		id: 2,
		title: 'Что такое Virtual DOM, и как он работает?',
		link: 'question/virtual-dom',
		src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5c-sFOyXeJ-tFKlQBs_mmr9fgDnXybh7WA&s',
		params: [
			{
				label: 'Рейтинг',
				value: 4,
			},
			{
				label: 'Сложность',
				value: 10,
			},
		],
	},
	{
		id: 3,
		title: 'Что такое Virtual DOM, и как он работает?',
		link: 'question/virtual-dom',
		src: '',
		params: [
			{
				label: 'Рейтинг',
				value: 4,
			},
			{
				label: 'Сложность',
				value: 10,
			},
		],
	},
];

export const InterviewQuestionsList = () => {
	return (
		<ul className={styles.list}>
			{interviewQuestionsData.map(({ id, ...props }) => (
				<InterviewQuestionsItem key={id} {...props} />
			))}
		</ul>
	);
};
