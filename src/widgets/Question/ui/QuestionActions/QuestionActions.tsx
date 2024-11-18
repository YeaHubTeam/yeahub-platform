import { Card } from '@/shared/ui/Card';

import { useProfileQuery } from '@/entities/auth';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import styles from './QuestionActions.module.css';

interface QuestionActionsProps {
	profileId: number | string;
	questionId: number | string;
	checksCount: number | undefined;
}

export const QuestionActions = ({ profileId, questionId, checksCount }: QuestionActionsProps) => {
	const { data: profile } = useProfileQuery();
	const isEmailVerified = profile?.isEmailVerified;

	return (
		<Card className={styles['question-actions']}>
			<div className={styles.wrapper}>
				<LearnQuestionButton
					profileId={profileId}
					questionId={questionId}
					isDisabled={!isEmailVerified || (checksCount !== undefined && checksCount >= 3)}
				/>
				<ResetQuestionStudyProgressButton
					profileId={profileId}
					questionId={questionId}
					isDisabled={!isEmailVerified || (checksCount !== undefined && checksCount === 0)}
				/>
			</div>
		</Card>
	);
};
