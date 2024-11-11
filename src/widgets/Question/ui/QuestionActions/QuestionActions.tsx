import { Card } from '@/shared/ui/Card';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import styles from './QuestionActions.module.css';

interface QuestionActionsProps {
	profileId: number | string;
	questionId: number | string;
	checksCount: number | undefined;
}

export const QuestionActions = ({ profileId, questionId, checksCount }: QuestionActionsProps) => {
	return (
		<Card className={styles['question-actions']}>
			<div className={styles.wrapper}>
				<LearnQuestionButton
					profileId={profileId}
					questionId={questionId}
					isDisabled={checksCount !== undefined && checksCount >= 3}
					size="small"
				/>
				<ResetQuestionStudyProgressButton
					profileId={profileId}
					questionId={questionId}
					isDisabled={checksCount !== undefined && checksCount === 0}
					size="small"
				/>
			</div>
		</Card>
	);
};
