import { Card } from '@/shared/ui/Card';
import { TextHtml } from '@/shared/ui/TextHtml';

import styles from './QuestionBody.module.css';

interface QuestionBodyProps {
	shortAnswer?: string;
	longAnswer?: string;
}

export const QuestionBody = ({ shortAnswer, longAnswer }: QuestionBodyProps) => {
	return (
		<>
			<Card className={styles.wrapper} withOutsideShadow>
				<h3 className={styles.title}>Краткий ответ</h3>
				<TextHtml className={styles.text} html={shortAnswer ?? 'Краткий ответ отсутствует'} />
			</Card>
			<Card expandable withOutsideShadow>
				<h3 className={styles.title}>Развёрнутый ответ</h3>
				<TextHtml className={styles.text} html={longAnswer ?? 'Ответ отсутствует'} />
			</Card>
		</>
	);
};
