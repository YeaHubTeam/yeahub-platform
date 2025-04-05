import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import { Answers } from '@/entities/quiz';

import { PassedQuestionsItem } from '../PassedQuestionsItem/PassedQuestionsItem';

import styles from './PassedQuestionsList.module.css';

export interface PassedQuestionsListProps {
	questions: Answers[];
	className?: string;
	handleClone?: () => void;
	hideCloneButton?: boolean;
}
export const PassedQuestionsList = ({
	questions,
	className,
	handleClone,
	hideCloneButton,
}: PassedQuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	return (
		<Card className={className} isTitleCenter title={t(InterviewQuizResult.TITLE_QUESTIONS_LIST)}>
			<ul className={styles.list}>
				{questions.map((question) => (
					<PassedQuestionsItem key={question.questionId} question={question} />
				))}
			</ul>
			{!hideCloneButton && (
				<Button className={styles.button} size="large" onClick={handleClone}>
					{t(InterviewQuizResult.CLONE_BUTTON)}
				</Button>
			)}
		</Card>
	);
};
