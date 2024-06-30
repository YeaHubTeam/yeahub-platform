import { InterviewHistoryItem } from '../InterviewHistoryItem/InterviewHistoryItem';

import styles from './InterviewHistoryList.module.css';

// временные данные
const interviewHistoryData = [
	{
		id: 1,
		title: 'Собеседование № 1',
		description: 'Interview № 1',
		keywords: ['javascript'],
		date: new Date(2024, 3, 15),
		correctAnswersCount: 45,
		incorrectAnswersCount: 15,
	},
	{
		id: 2,
		title: 'Собеседование № 2',
		description: 'Interview № 2',
		keywords: ['javascript'],
		date: new Date(2024, 3, 18),
		correctAnswersCount: 45,
		incorrectAnswersCount: 15,
	},
	{
		id: 3,
		title: 'Собеседование № 3',
		description: 'Interview № 3',
		keywords: ['javascript'],
		date: new Date(15, 3, 2024),
		correctAnswersCount: 45,
		incorrectAnswersCount: 15,
	},
];

export const InterviewHistoryList = () => {
	return (
		<ul className={styles.list}>
			{interviewHistoryData.map((interview) => (
				<InterviewHistoryItem key={interview.id} interview={interview} />
			))}
		</ul>
	);
};
