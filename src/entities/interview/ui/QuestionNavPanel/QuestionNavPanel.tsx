import { FC } from 'react';
import { Icon } from 'yeahub-ui-kit';

import { ResponseButtons } from '../ResponseButtons/ResponseButtons';

import styles from './QuestionNavPanel.module.css';

interface Props {
	goToNextSlide: () => void;
	goToPrevSlide: () => void;
	showResponseButtons?: boolean;
}

export const QuestionNavPanel: FC<Props> = ({
	goToNextSlide,
	goToPrevSlide,
	showResponseButtons = true,
}) => {
	return (
		<div className={styles.panel}>
			<button className={styles.button} onClick={goToPrevSlide}>
				<Icon icon="caretCircleLeft" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
			{showResponseButtons && <ResponseButtons />}
			<button className={styles.button} onClick={goToNextSlide}>
				<Icon icon="caretCircleRight" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
		</div>
	);
};
