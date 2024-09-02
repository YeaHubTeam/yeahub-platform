import { Loader } from '@/shared/ui/Loader';

import { QuizHistoryResponse } from '@/entities/quiz';

import { FullInterviewHistoryItem } from '../FullInterviewHistoryItem/FullInterviewHistoryItem';

import styles from './FullInterviewHistoryList.module.css';

interface InterviewHistoryProps {
	quizzesHistory?: QuizHistoryResponse[];
}

export const FullInterviewHistoryList = ({ quizzesHistory }: InterviewHistoryProps) => {
	if (!quizzesHistory) {
		return <Loader />;
	}

	const isEmptyData = quizzesHistory.length === 0;

	return (
		<>
			{!isEmptyData ? (
				<ul className={styles.list}>
					{quizzesHistory.map((interview) => (
						<FullInterviewHistoryItem key={interview.id} interview={interview} />
					))}
				</ul>
			) : (
				<p>Данных нет</p>
			)}
		</>
	);
};
