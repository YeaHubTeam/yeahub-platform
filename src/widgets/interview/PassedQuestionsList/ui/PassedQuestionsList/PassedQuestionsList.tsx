import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewQuizResult } from '@/shared/config';
import { Card } from '@/shared/ui/Card';

import { Answers } from '@/entities/quiz';

import { PassedQuestionsItem } from '../PassedQuestionsItem/PassedQuestionsItem';

import styles from './PassedQuestionsList.module.css';

export interface PassedQuestionsListProps {
	questions: Answers[];
	className?: string;
}

export const PassedQuestionsList = ({ questions, className }: PassedQuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	return (
		<Card className={className} isTitleCenter title={t(InterviewQuizResult.TITLE_QUESTIONS_LIST)}>
			<ul className={styles.list}>
				{questions.map((question) => (
					<PassedQuestionsItem key={question.questionId} question={question} />
				))}
			</ul>
		</Card>
	);
};
