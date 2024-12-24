import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewHistory } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { formatDate } from '@/shared/helpers/formatDate';
import { route } from '@/shared/helpers/route';

import { InterviewResults, QuizWithoutQuestions } from '@/entities/quiz';

import styles from './InterviewHistoryItem.module.css';

interface InterviewHistoryItemProps {
	interview: QuizWithoutQuestions;
}

export const InterviewHistoryItem = ({ interview }: InterviewHistoryItemProps) => {
	const { id, successCount, fullCount } = interview;
	const incorrectAnswersCount = fullCount - successCount;
	const { t } = useTranslation(i18Namespace.interviewHistory);
	const formattedDate = formatDate(parseISO(interview.endDate), 'dd/MM/yyyy');

	return (
		<li className={styles.item}>
			<Link to={route(ROUTES.interview.history.result.page, id)} className={styles.link}>
				<time className={styles.time}>{formattedDate}</time>
				<div className={styles.info}>
					<h4 className={styles.title}>
						{t(InterviewHistory.QUIZ_TITLE, { number: interview.quizNumber })}
					</h4>
					<ul className={styles.params}>
						<InterviewResults
							label={t(InterviewHistory.RESULT)}
							correctAnswersCount={successCount}
							incorrectAnswersCount={incorrectAnswersCount}
						/>
					</ul>
				</div>
			</Link>
		</li>
	);
};
