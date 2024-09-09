import { ReactNode } from 'react';
import { Button } from 'yeahub-ui-kit';

import { useLearnQuestionMutation } from '../api/learnQuestionApi';

import styles from './LearnQuestionButton.module.css';

interface LearnQuestionProps {
	profileId: number | string;
	questionId: number | string;
	preffix: ReactNode;
}

export const LearnQuestionButton = ({ profileId, questionId, preffix }: LearnQuestionProps) => {
	const [learnQuestion, { isLoading }] = useLearnQuestionMutation();

	const handleLearnQuestion = async () => {
		try {
			await learnQuestion({
				profileId: String(profileId),
				questionId: Number(questionId),
				isLearned: true,
			});
		} catch (error) {
			console.error('Ошибка при добавлении вопроса в изучаемые:', error);
		}
	};

	return (
		<Button
			className={styles.btn}
			preffix={preffix}
			theme="tertiary"
			onClick={handleLearnQuestion}
			disabled={isLoading}
		>
			Учить
		</Button>
	);
};
