import { Loader } from '@/shared/ui/Loader';

import { QuizHistoryResponse } from '@/entities/quiz';

import { FullInterviewHistoryItem } from '../FullInterviewHistoryItem/FullInterviewHistoryItem';

import styles from './FullInterviewHistoryList.module.css';

interface FullInterviewHistoryListProps {
	data?: QuizHistoryResponse[];
}

export const FullInterviewHistoryList = ({ data }: FullInterviewHistoryListProps) => {
	if (!data) {
		return <Loader />;
	}

	const isEmptyData = data.length === 0;

	return (
		<>
			{!isEmptyData ? (
				<ul className={styles.list}>
					{data.map((interview) => (
						<FullInterviewHistoryItem key={interview.id} interview={interview} />
					))}
				</ul>
			) : (
				<p>Данных нет</p>
			)}
		</>
	);
};
