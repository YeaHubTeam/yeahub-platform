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
	return (
		<div className={classNames(styles.panel, className)}>
			<button
				className={styles.button}
				onClick={() => {
					goToPrevSlide();
					setIsAnswerVisible(false);
				}}
			>
				<Icon icon="caretCircleLeft" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
			{showResponseButtons && (
				<ResponseButtons
					className={styles['action-btns']}
					answer={answer}
					changeAnswer={changeAnswer}
				/>
			)}
			<button
				className={styles.button}
				onClick={() => {
					goToNextSlide();
					setIsAnswerVisible(false);
				}}
			>
				<Icon icon="caretCircleRight" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
		</div>
	);
};
