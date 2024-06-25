import styles from './QuestionProgressBar.module.css';

export const QuestionProgressBar = () => {
	return (
		<div>
			<progress className={styles['progress-bar']} value="20" max="100"></progress>
			<p className={styles.question}>Вопрос викторины 10 из 45</p>
		</div>
	);
};
