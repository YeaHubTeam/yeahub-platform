import { Button, Icon } from 'yeahub-ui-kit';

import { useResetQuestionProgressMutation } from '../api/resetQuestionStudyProgressApi';

import styles from './ResetQuestionStudyProgressButton.module.css';

interface ResetQuestionStudyProgressProps {
	profileId: number | string;
	questionId: number | string;
}

export const ResetQuestionStudyProgressButton = ({
	profileId,
	questionId,
}: ResetQuestionStudyProgressProps) => {
	const [resetQuestion, { isLoading }] = useResetQuestionProgressMutation();

	const handleClick = async () => {
		try {
			await resetQuestion({ profileId, questionId }).unwrap();
		} catch (error) {
			console.error('Не удалось сбросить прогресс вопроса:', error);
		}
	};

	return (
		<Button
			className={styles.btn}
			preffix={
				<Icon className={styles.icon} icon="clockCounterClockwise" key={'clockCounterClockwise'} />
			}
			theme="tertiary"
			onClick={handleClick}
			disabled={isLoading}
		>
			Повторить
		</Button>
	);
};
