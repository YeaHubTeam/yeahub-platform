import { Icon } from 'yeahub-ui-kit';

import { Button } from '@/shared/ui/Button';

import { useResetQuestionProgressMutation } from '../api/resetQuestionStudyProgressApi';

import styles from './ResetQuestionStudyProgressButton.module.css';

interface ResetQuestionStudyProgressProps {
	profileId: number | string;
	questionId: number | string;
	isSmallIcon?: boolean;
	isDisabled: boolean;
}

export const ResetQuestionStudyProgressButton = ({
	profileId,
	questionId,
	isSmallIcon,
	isDisabled,
}: ResetQuestionStudyProgressProps) => {
	const [resetQuestion, { isLoading }] = useResetQuestionProgressMutation();

	const handleClick = async () => {
		try {
			await resetQuestion({ profileId, questionId }).unwrap();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Не удалось сбросить прогресс вопроса:', error);
		}
	};

	const iconSize = isSmallIcon ? 20 : 24;

	return (
		<Button
			className={styles.btn}
			preffix={
				<Icon
					className={styles.icon}
					icon="clockCounterClockwise"
					key={'clockCounterClockwise'}
					size={iconSize}
				/>
			}
			variant="tertiary"
			onClick={handleClick}
			disabled={isLoading || isDisabled}
		>
			Повторить
		</Button>
	);
};
