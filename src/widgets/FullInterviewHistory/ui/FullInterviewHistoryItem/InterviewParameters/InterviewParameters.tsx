import { parseISO } from 'date-fns';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { formatDate } from '@/shared/helpers/formatDate';
import { getTimeDifference } from '@/shared/helpers/formatTime';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { InterviewResults, type QuizHistoryResponse } from '@/entities/quiz';

import styles from './InterviewParameters.module.css';

interface Props {
	interview: QuizHistoryResponse;
}

export const InterviewParameters = ({ interview }: Props) => {
	const { endDate, startDate, fullCount, successCount } = interview;
	const { t } = useI18nHelpers(i18Namespace.interviewHistory);

	const timer = getTimeDifference(startDate, endDate);
	const interviewStartDate = formatDate(parseISO(startDate), 'dd/MM/yyyy');
	const incorrectAnswersCount = fullCount - successCount;

	return (
		<div className={styles.param}>
			<time dateTime={interviewStartDate}>
				<span className={styles.text}>{t('startDateInterviewTitle')}</span>
				{formatDate(parseISO(startDate))}
			</time>
			<p>
				<span className={styles.text}>{t('totalQuestionsTitle')}</span> {fullCount}
			</p>
			<InterviewResults
				label={t('resultTitle')}
				correctAnswersCount={successCount}
				incorrectAnswersCount={incorrectAnswersCount}
			/>

			<div className={styles.time}>
				<Icon icon="clock" size={24} color="--palette-ui-black-500" />
				<time>{timer}</time>
			</div>
		</div>
	);
};
