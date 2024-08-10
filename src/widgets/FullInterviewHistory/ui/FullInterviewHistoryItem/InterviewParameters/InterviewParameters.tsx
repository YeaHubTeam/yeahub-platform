import { differenceInSeconds, format, parseISO } from 'date-fns';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { formatDate } from '@/shared/helpers/formatDate';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { InterviewResults } from '@/entities/quiz';
import { QuizHistoryResponse } from '@/entities/quiz';

import styles from './InterviewParameters.module.css';

interface Props {
	interview: QuizHistoryResponse;
}

export const InterviewParameters = ({ interview }: Props) => {
	const { endDate, startDate, fullCount, successCount } = interview;
	const { t } = useI18nHelpers(i18Namespace.interviewHistory);

	const formattedStartDate = parseISO(startDate);
	const formattedEndDate = parseISO(endDate);

	const difference = differenceInSeconds(formattedEndDate, formattedStartDate);
	const incorrectAnswersCount = fullCount - successCount;

	return (
		<div className={styles.param}>
			<time dateTime={formatDate(parseISO(startDate))}>
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
			{difference > 0 && (
				<div className={styles.time}>
					<Icon icon="clock" size={24} color="--palette-ui-black-500" />
					<time>{format(difference, 'HH:MM:SS')}</time>
				</div>
			)}
		</div>
	);
};
