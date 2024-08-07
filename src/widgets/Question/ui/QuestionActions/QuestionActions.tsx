import { Button, Icon } from 'yeahub-ui-kit';

import { Block } from '@/shared/ui/Block';

import styles from './QuestionActions.module.css';

export const QuestionActions = () => {
	return (
		<Block className={styles['question-actions']}>
			<div className={styles.wrapper}>
				<Button className={styles.btn} preffix={<Icon icon="student" />} theme="tertiary">
					Учить
				</Button>
				<Button
					className={styles.btn}
					preffix={<Icon icon="bookmarks" key={'bookmarks'} />}
					theme="tertiary"
				>
					Сохранить
				</Button>
				<Button
					className={styles.btn}
					preffix={<Icon icon="clockCounterClockwise" key={'clockCounterClockwise'} />}
					theme="tertiary"
				>
					Повторить
				</Button>
				<Button
					className={styles.btn}
					preffix={<Icon icon="skipForward" key={'skipForward'} />}
					theme="tertiary"
				>
					Пропустить
				</Button>
			</div>
		</Block>
	);
};
