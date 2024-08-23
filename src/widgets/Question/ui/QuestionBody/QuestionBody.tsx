import { TextHtml } from '@/shared/TextHtml/TextHtml';
import { Block } from '@/shared/ui/Block';

import styles from './QuestionBody.module.css';

interface Props {
	shortAnswer?: string;
	longAnswer?: string;
}

export const QuestionBody = ({ shortAnswer, longAnswer }: Props) => {
	return (
		<>
			<Block className={styles.wrapper}>
				<h3 className={styles.title}>Краткий ответ</h3>
				<p className={styles.text}>
					<TextHtml html={shortAnswer ?? 'Краткий ответ отсутствует'} />
				</p>
			</Block>
			<Block expandable>
				<h3 className={styles.title}>Развёрнутый ответ</h3>
				<p className={styles.text}>
					<TextHtml html={longAnswer ?? 'Ответ отсутствует'} />
				</p>
			</Block>
		</>
	);
};
