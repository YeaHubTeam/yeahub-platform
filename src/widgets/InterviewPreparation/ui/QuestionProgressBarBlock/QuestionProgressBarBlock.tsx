import { QuestionProgressBar } from '@/entities/interview';

import styles from './QuestionProgressBarBlock.module.css';

export const QuestionProgressBarBlock = () => {
	return (
		<div>
			<QuestionProgressBar />
			<p className={styles.question}>Вопрос викторины 10 из 45</p>
		</div>
	);
};
