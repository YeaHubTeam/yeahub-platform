import classNames from 'classnames';
import { Icon } from 'yeahub-ui-kit';

import { QuizQuestionAnswerType } from '../../model/types/quiz';
import { ResponseButtons } from '../ResponseButtons/ResponseButtons';

import styles from './QuestionNavPanel.module.css';

interface QuestionNavPanelProps {
	answer: QuizQuestionAnswerType;
	goToNextSlide: () => void;
	goToPrevSlide: () => void;
	changeAnswer: (answer: QuizQuestionAnswerType) => void;
	showResponseButtons?: boolean;
	className?: string;
	setIsAnswerVisible: (value: boolean) => void;
}

export const QuestionNavPanel = ({
	goToNextSlide,
	goToPrevSlide,
	answer,
	changeAnswer,
	showResponseButtons = false,
	className,
	setIsAnswerVisible,
}: QuestionNavPanelProps) => {
	const handlePrevSlide = () => {
		goToPrevSlide();
		setIsAnswerVisible(false);
	};

	const handleRightSlide = () => {
		goToNextSlide();
		setIsAnswerVisible(false);
	};

	return (
		<div className={classNames(styles.panel, className)}>
			<button className={styles.button} onClick={handlePrevSlide}>
				<Icon icon="caretCircleLeft" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
			{showResponseButtons && (
				<ResponseButtons
					className={styles['action-btns']}
					answer={answer}
					changeAnswer={changeAnswer}
				/>
			)}
			<button className={styles.button} onClick={handleRightSlide}>
				<Icon icon="caretCircleRight" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
		</div>
	);
};
