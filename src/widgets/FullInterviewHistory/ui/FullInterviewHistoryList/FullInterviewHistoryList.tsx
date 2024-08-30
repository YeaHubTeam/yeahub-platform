import { Loader } from '@/shared/ui/Loader';

import { QuizHistoryResponse } from '@/entities/quiz';

import { FullInterviewHistoryItem } from '../FullInterviewHistoryItem/FullInterviewHistoryItem';

import styles from './FullInterviewHistoryList.module.css';

interface FullInterviewHistoryListProps {
	data?: QuizHistoryResponse[];
}

// eslint-disable-next-line react/prop-types
export const FullInterviewHistoryList: React.FC<FullInterviewHistoryListProps> = ({ data }) => {
	if (!data) {
		return <Loader />;
	}

	// eslint-disable-next-line react/prop-types
	const isEmptyData = data.length === 0;

	return (
		<>
			{!isEmptyData ? (
				<ul className={styles.list}>
					{
						// eslint-disable-next-line react/prop-types
						data.map((interview) => (
							<FullInterviewHistoryItem key={interview.id} interview={interview} />
						))
					}
				</ul>
			) : (
				<p>Данных нет</p>
			)}
		</>
	);
};
