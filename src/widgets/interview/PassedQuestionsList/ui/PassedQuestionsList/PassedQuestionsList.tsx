import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector, useCurrentProject } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import { getHasPremiumAccess } from '@/entities/profile';
import { Answers } from '@/entities/quiz';

import { PassedQuestionsItem } from '../PassedQuestionsItem/PassedQuestionsItem';

import styles from './PassedQuestionsList.module.css';

export interface PassedQuestionsListProps {
	questions: Answers[];
	className?: string;
	handleClone?: () => void;
}
export const PassedQuestionsList = ({
	questions,
	className,
	handleClone,
}: PassedQuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);
	const hasPremium = useAppSelector(getHasPremiumAccess);

	const project = useCurrentProject();

	return (
		<Card className={className} isTitleCenter title={t(InterviewQuizResult.TITLE_QUESTIONS_LIST)}>
			<ul className={styles.list}>
				{questions.map((question) => (
					<PassedQuestionsItem key={question.questionId} question={question} />
				))}
			</ul>
			{project === 'platform' && hasPremium && (
				<Button className={styles.button} size="large" onClick={handleClone}>
					{t(InterviewQuizResult.CLONE_BUTTON)}
				</Button>
			)}
		</Card>
	);
};
