import classNames from 'classnames';
import { Icon } from 'yeahub-ui-kit';

import { ResponseButtons } from '../ResponseButtons/ResponseButtons';

import styles from './QuestionNavPanel.module.css';

interface Props {
	goToNextSlide: () => void;
	goToPrevSlide: () => void;
	answer: string;
	changeAnswer: (answer: string) => void;
	showResponseButtons?: boolean;
	className?: string;
}

export const QuestionNavPanel = ({
	goToNextSlide,
	goToPrevSlide,
	answer,
	changeAnswer,
	showResponseButtons = false,
	className,
}: Props) => {
	return (
		<div className={classNames(styles.panel, className)}>
			<button className={styles.button} onClick={goToPrevSlide}>
				<Icon icon="caretCircleLeft" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
			{showResponseButtons && (
				<ResponseButtons
					className={styles['action-btns']}
					answer={answer}
					changeAnswer={changeAnswer}
				/>
			)}
			<button className={styles.button} onClick={goToNextSlide}>
				<Icon icon="caretCircleRight" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
		</div>
	);
};
