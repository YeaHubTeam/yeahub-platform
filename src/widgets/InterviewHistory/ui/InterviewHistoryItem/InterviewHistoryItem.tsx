import { FC } from 'react';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { formatDate } from '@/shared/helpers/formatDate';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { Interview, InterviewResults } from '@/entities/quiz';

import styles from './InterviewHistoryItem.module.css';

interface Props {
	interview: Interview;
}

export const InterviewHistoryItem: FC<Props> = ({ interview }) => {
	const { t } = useI18nHelpers(i18Namespace.interview);
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
							label={t('history_preparation.resultText')}
							correctAnswersCount={correctAnswersCount}
							incorrectAnswersCount={incorrectAnswersCount}
						/>
					</ul>
				</div>
			</Link>
		</li>
	);
};
