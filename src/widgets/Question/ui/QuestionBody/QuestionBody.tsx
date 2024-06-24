import { Block } from '@/shared/ui/Block';

import styles from './QuestionBody.module.css';

interface props {
	shortAnswer: string | undefined;
	longAnswer: string | undefined;
}

export const QuestionBody = ({ shortAnswer, longAnswer }: props) => {
	return (
		<>
			<Block className={styles.wrapper}>
				<h3>Краткий ответ</h3>
				<p>{shortAnswer ?? ''}</p>
			</Block>
			<Block>
				<h3>Развёрнутый ответ</h3>
				<p>{longAnswer ?? ''}</p>
			</Block>
		</>
	);
};
