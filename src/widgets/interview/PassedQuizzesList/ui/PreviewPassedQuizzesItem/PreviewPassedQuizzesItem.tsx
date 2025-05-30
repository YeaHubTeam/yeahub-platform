import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewHistory } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { formatDate } from '@/shared/helpers/formatDate';
import { route } from '@/shared/helpers/route';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { QuizWithoutQuestions } from '@/entities/quiz';

import { InterviewResults } from '../InterviewResults/InterviewResults';

import styles from './PreviewPassedQuizzesItem.module.css';

interface InterviewHistoryItemProps {
	interview: QuizWithoutQuestions;
}

export const PreviewPassedQuizzesItem = ({ interview }: InterviewHistoryItemProps) => {
	const { id, successCount, fullCount } = interview;
	const incorrectAnswersCount = fullCount - successCount;
	const { t } = useTranslation(i18Namespace.interviewHistory);
	const formattedDate = formatDate(parseISO(interview.endDate));

	return (
		<li className={styles.item}>
			<Link to={route(ROUTES.interview.history.result.page, id)} className={styles.link}>
				<Text variant="body3-accent" color="black-500" className={styles.date}>
					{formattedDate}
				</Text>
				<Flex wrap="wrap" justify="between" gap="14" className={styles.info}>
					<Text variant={'body3-accent'}>
						{t(InterviewHistory.QUIZ_TITLE, { number: interview.quizNumber })}
					</Text>
					<Flex componentType="ul" gap="24">
						<InterviewResults
							label={t(InterviewHistory.RESULT)}
							correctAnswersCount={successCount}
							incorrectAnswersCount={incorrectAnswersCount}
						/>
					</Flex>
				</Flex>
			</Link>
		</li>
	);
};
