import { Button, Icon } from 'yeahub-ui-kit';

import { useResetQuestionProgressMutation } from '../api/resetQuestionStudyProgressApi';
import { ResetQuestionStudyProgressParams } from '../model/types/resetQuestionStudyProgressTypes';

import styles from './ResetQuestionStudyProgressButton.module.css';

export const ResetQuestionStudyProgressButton = ({
	profileId,
	questionId,
}: ResetQuestionStudyProgressParams) => {
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
