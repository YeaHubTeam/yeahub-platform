import { Button, Icon } from 'yeahub-ui-kit';

import { useLearnQuestionMutation } from '../api/learnQuestionApi';

import styles from './LearnQuestionButton.module.css';

interface LearnQuestionProps {
	profileId: number | string;
	questionId: number | string;
	isSmallIcon?: boolean;
	isDisabled: boolean;
	size?: 'small' | 'medium' | 'large';
}

export const LearnQuestionButton = ({
	profileId,
	questionId,
	isSmallIcon,
	isDisabled,
	size,
}: LearnQuestionProps) => {
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
			theme="tertiary"
			onClick={handleLearnQuestion}
			disabled={isLoading || isDisabled}
			size={size}
		>
			Уже знаю
		</Button>
	);
};
