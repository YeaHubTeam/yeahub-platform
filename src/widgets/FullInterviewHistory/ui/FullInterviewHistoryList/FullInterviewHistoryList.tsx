import { FullInterviewHistoryItem } from '../FullInterviewHistoryItem/FullInterviewHistoryItem';

import styles from './FullInterviewHistoryList.module.css';

export const FullInterviewHistoryList = () => {
	// временные данные
	const INTERVIEW_HISTORY = [
		{
			id: 1,
			title: 'Собеседование № 1',
			description: 'Interview № 1',
			keywords: ['javascript'],
			date: new Date(2024, 3, 15),
			correctAnswersCount: 45,
			incorrectAnswersCount: 15,
			timeStamp: '00:55:56',
			questionCount: 45,
			questionCategories: ['Figma', 'Wireframing', 'React.js', 'CSS', 'HTML'],
		},
		{
			id: 2,
			title: 'Собеседование № 2',
			description: 'Interview № 2',
			keywords: ['javascript'],
			date: new Date(2024, 3, 18),
			correctAnswersCount: 45,
			incorrectAnswersCount: 15,
			timeStamp: '00:30:00',
			questionCount: 45,
			questionCategories: ['Figma', 'Wireframing', 'React.js', 'CSS', 'HTML'],
		},
		{
			id: 3,
			title: 'Собеседование № 3',
			description: 'Interview № 3',
			keywords: ['javascript'],
			date: new Date(15, 3, 2024),
			correctAnswersCount: 45,
			incorrectAnswersCount: 15,
			timeStamp: '00:45:25',
			questionCount: 45,
			questionCategories: ['Figma', 'Wireframing', 'React.js', 'CSS'],
		},
	];

	return (
		<ul className={styles.list}>
			{INTERVIEW_HISTORY.map((interview) => {
				return <FullInterviewHistoryItem key={interview.id} interview={interview} />;
			})}
		</ul>
	);
};
