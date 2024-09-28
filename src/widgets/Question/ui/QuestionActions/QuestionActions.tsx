import { Card } from '@/shared/ui/Card';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import styles from './QuestionActions.module.css';

interface QuestionActionsProps {
	profileId: number | string;
	questionId: number | string;
}

export const QuestionActions = ({ profileId, questionId }: QuestionActionsProps) => {
	return (
		<Card className={styles['question-actions']}>
			<div className={styles.wrapper}>
				<LearnQuestionButton profileId={profileId} questionId={questionId} />
				<ResetQuestionStudyProgressButton profileId={profileId} questionId={questionId} />
			</div>
		</Card>
	);
};
