import { FC } from 'react';
import { Icon, Button } from 'yeahub-ui-kit';

import styles from './QuestionNavPanel.module.css';

interface Props {
	goToNextQuestion: () => void;
	goToPrevQuestion: () => void;
}

export const QuestionNavPanel: FC<Props> = ({ goToNextQuestion, goToPrevQuestion }) => {
	return (
		<div className={styles.panel}>
			<button className={styles.button} onClick={goToPrevQuestion}>
				<Icon icon="caretCircleLeft" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
			<div className={styles.wrapper}>
				<Button
					textClassName={styles['action-button']}
					theme="tertiary"
					size="small"
					preffix={<Icon key="thumbsDown" icon="thumbsDown" size={24} />}
				>
					Не знаю
				</Button>
				<Button
					textClassName={styles['action-button']}
					theme="tertiary"
					size="small"
					preffix={<Icon key="clockCounterClockwise" icon="clockCounterClockwise" size={24} />}
				>
					Повторить
				</Button>
				<Button
					textClassName={styles['action-button']}
					theme="tertiary"
					size="small"
					preffix={<Icon key="thumbsUp" icon="thumbsUp" size={24} />}
				>
					Знаю
				</Button>
			</div>
			<button className={styles.button} onClick={goToNextQuestion}>
				<Icon icon="caretCircleRight" className={styles.arrow} color="--palette-ui-purple-700" />
			</button>
		</div>
	);
};
