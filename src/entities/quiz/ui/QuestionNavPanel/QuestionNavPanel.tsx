import classNames from 'classnames';
import { Icon, Button } from 'yeahub-ui-kit';

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
	questionNumber: number;
	totalCount: number;
}

export const QuestionNavPanel = ({
	goToNextSlide,
	goToPrevSlide,
	answer,
	changeAnswer,
	showResponseButtons = false,
	className,
	setIsAnswerVisible,
	questionNumber,
	totalCount,
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
			<div className={styles['button-wrapper']}>
				<Button
					className={styles.button}
					onClick={handlePrevSlide}
					size="small"
					fullWidth={true}
					suffix={
						<Icon icon="caretLeft" size={20} color="--palette-ui-purple-700" key="caretLeft" />
					}
					theme="outline"
					disabled={questionNumber === 1}
				/>
			</div>
			{showResponseButtons && (
				<ResponseButtons
					className={styles['action-btns']}
					answer={answer}
					changeAnswer={changeAnswer}
				/>
			)}
			<div className={styles['button-wrapper']}>
				<Button
					className={styles.button}
					onClick={handleRightSlide}
					preffix={
						<Icon color="--palette-ui-purple-700" icon="caretRight" size={20} key="caretRight" />
					}
					fullWidth={true}
					theme="outline"
					disabled={questionNumber === totalCount || !answer}
				/>
			</div>
		</div>
	);
};
