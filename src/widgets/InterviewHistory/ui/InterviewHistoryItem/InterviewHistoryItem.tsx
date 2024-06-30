import { FC } from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '@/shared/helpers/formatDate';

import { Interview, InterviewResults } from '@/entities/interview';

import styles from './InterviewHistoryItem.module.css';

interface Props {
	interview: Interview;
}

export const InterviewHistoryItem: FC<Props> = ({ interview }) => {
	const { id, title, date, correctAnswersCount, incorrectAnswersCount } = interview;

	const formattedDate = formatDate(date);

	return (
		<li className={styles.item}>
			<Link to={`/interview/${id}`} className={styles.link}>
				<time>{formattedDate}</time>
				<div className={styles.info}>
					<h4 className={styles.title}>{title}</h4>
					<ul className={styles.params}>
						<InterviewResults
							label="Результат"
							correctAnswersCount={correctAnswersCount}
							incorrectAnswersCount={incorrectAnswersCount}
						/>
					</ul>
				</div>
			</Link>
		</li>
	);
};
