import { Icon } from 'yeahub-ui-kit';

import { Button } from '@/shared/ui/Button';

import { useLearnQuestionMutation } from '../api/learnQuestionApi';

import styles from './LearnQuestionButton.module.css';

interface LearnQuestionProps {
	profileId: number | string;
	questionId: number | string;
	isSmallIcon?: boolean;
}

export const LearnQuestionButton = ({ profileId, questionId, isSmallIcon }: LearnQuestionProps) => {
	const [learnQuestion, { isLoading }] = useLearnQuestionMutation();

	const handleLearnQuestion = () => {
		return learnQuestion({
			profileId: String(profileId),
			questionId: Number(questionId),
			isLearned: true,
		});
	};

	const iconSize = isSmallIcon ? 20 : 24;

	return (
		<Button
			className={styles.btn}
			preffix={<Icon icon="thumbsUp" size={iconSize} />}
			variant="tertiary"
			onClick={handleLearnQuestion}
			disabled={isLoading}
		>
			Уже знаю
		</Button>
	);
};
