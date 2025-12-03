import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { InterviewHistory, i18Namespace } from '@/shared/config';
import { formatDate, getTimeDifference } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import type { QuizWithoutQuestions } from '@/entities/quiz';

import { InterviewResults } from '../InterviewResults/InterviewResults';

import styles from './InterviewParameters.module.css';

interface InterviewParametersProps {
	interview: QuizWithoutQuestions;
}

export const InterviewParameters = ({ interview }: InterviewParametersProps) => {
	const { endDate, startDate, fullCount, successCount } = interview;
	const { t } = useTranslation(i18Namespace.interviewHistory);

	const hasValidDates = startDate && endDate;

	const timer = hasValidDates && getTimeDifference(startDate, endDate);
	const interviewStartDate = startDate && formatDate(parseISO(startDate));
	const incorrectAnswersCount = fullCount - successCount;

	return (
		<Flex wrap="wrap" gap="24" className={styles.param}>
			<Flex gap="4">
				<Text variant="body3-accent" color="black-500">
					{t(InterviewHistory.START_DATE)}
				</Text>
				<time dateTime={interviewStartDate}>
					<Text variant="body3-accent" color="black-700">
						{interviewStartDate}
					</Text>
				</time>
			</Flex>
			<Flex gap="4">
				<Text variant="body3-accent" color="black-500">
					{t(InterviewHistory.TOTAL_QUESTIONS)}
				</Text>
				<Text variant="body3-accent" color="black-700">
					{fullCount}
				</Text>
			</Flex>
			<InterviewResults
				label={t(InterviewHistory.RESULT)}
				correctAnswersCount={successCount}
				incorrectAnswersCount={incorrectAnswersCount}
			/>
			<Flex align="center" gap="4">
				<Icon icon="clock" size={24} color="black-500" />
				<time>
					<Text variant="body3-accent" color="black-700">
						{timer}
					</Text>
				</time>
			</Flex>
		</Flex>
	);
};
