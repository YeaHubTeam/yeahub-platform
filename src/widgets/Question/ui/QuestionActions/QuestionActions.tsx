import { Button, Icon } from 'yeahub-ui-kit';

import { Block } from '@/shared/ui/Block';

import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import styles from './QuestionActions.module.css';

interface QuestionActionsProps {
	profileId: number | string;
	questionId: number | string;
}

export const QuestionActions = ({ profileId, questionId }: QuestionActionsProps) => {
	return (
		<Block className={styles['question-actions']}>
			<div className={styles.wrapper}>
				<Button
					className={styles.btn}
					preffix={<Icon className={styles.icon} icon="student" />}
					theme="tertiary"
				>
					Учить
				</Button>
				<ResetQuestionStudyProgressButton profileId={profileId} questionId={questionId} />
				<Button
					className={styles.btn}
					preffix={<Icon className={styles.icon} icon="skipForward" key={'skipForward'} />}
					theme="tertiary"
				>
					Пропустить
				</Button>
			</div>
		</Block>
	);
};
