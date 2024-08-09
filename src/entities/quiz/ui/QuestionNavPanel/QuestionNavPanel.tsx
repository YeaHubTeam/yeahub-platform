import classNames from 'classnames';
import { Icon } from 'yeahub-ui-kit';

import { ResponseButtons } from '../ResponseButtons/ResponseButtons';

import styles from './QuestionNavPanel.module.css';

interface Props {
	goToNextSlide: () => void;
	goToPrevSlide: () => void;
	showResponseButtons?: boolean;
	className?: string;
}

export const QuestionNavPanel = ({
	goToNextSlide,
	goToPrevSlide,
	showResponseButtons = true,
	className,
}: Props) => {
	return (
		<div className={classNames(styles.panel, className)}>
			<button className={styles.button} onClick={goToPrevSlide}>
				<Icon icon="caretCircleLeft" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
			{showResponseButtons && <ResponseButtons className={styles['action-btns']} />}
			<button className={styles.button} onClick={goToNextSlide}>
				<Icon icon="caretCircleRight" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
		</div>
	);
};
