import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewHistory } from '@/shared/config/i18n/i18nTranslations';
import { formatDate } from '@/shared/helpers/formatDate';
import { getTimeDifference } from '@/shared/helpers/formatTime';
import { Flex } from '@/shared/ui/Flex';

import { InterviewResults, type QuizWithoutQuestions } from '@/entities/quiz';

import styles from './InterviewParameters.module.css';

interface InterviewParametersProps {
	interview: QuizWithoutQuestions;
}

export const InterviewParameters = ({ interview }: InterviewParametersProps) => {
	const { endDate, startDate, fullCount, successCount } = interview;
	const { t } = useTranslation(i18Namespace.interviewHistory);

	const timer = getTimeDifference(startDate, endDate);
	const interviewStartDate = formatDate(parseISO(startDate), 'dd/MM/yyyy');
	const incorrectAnswersCount = fullCount - successCount;

	return (
		<div className={styles.param}>
			<time dateTime={interviewStartDate}>
				<span className={styles.text}>{t(InterviewHistory.START_DATE)}</span>
				{interviewStartDate}
			</time>
			<p>
				<span className={styles.text}>{t(InterviewHistory.TOTAL_QUESTIONS)}</span> {fullCount}
			</p>
			<InterviewResults
				label={t(InterviewHistory.RESULT)}
				correctAnswersCount={successCount}
				incorrectAnswersCount={incorrectAnswersCount}
			/>

			<Flex align="center" gap="4">
				<Icon icon="clock" size={24} color="--palette-ui-black-500" />
				<time>{timer}</time>
			</Flex>
		</div>
	);
};
