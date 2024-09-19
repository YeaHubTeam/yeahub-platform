import { TextHtml } from '@/shared/TextHtml/TextHtml';
import { Card } from '@/shared/ui/Card';

import styles from './QuestionBody.module.css';

interface QuestionBodyProps {
	shortAnswer?: string;
	longAnswer?: string;
}

export const QuestionBody = ({ shortAnswer, longAnswer }: QuestionBodyProps) => {
	return (
		<>
			<Card className={styles.wrapper}>
				<h3 className={styles.title}>Краткий ответ</h3>
				<p className={styles.text}>
					<TextHtml html={shortAnswer ?? 'Краткий ответ отсутствует'} />
				</p>
			</Card>
			<Card expandable>
				<h3 className={styles.title}>Развёрнутый ответ</h3>
				<p className={styles.text}>
					<TextHtml html={longAnswer ?? 'Ответ отсутствует'} />
				</p>
			</Card>
		</>
	);
};
