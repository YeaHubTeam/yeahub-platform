import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import styles from './QuestionBody.module.css';

interface QuestionBodyProps {
	shortAnswer: string;
	longAnswer: string;
}

export const QuestionBody = ({ shortAnswer, longAnswer }: QuestionBodyProps) => {
	return (
		<>
			<Card className={styles.wrapper} withOutsideShadow>
				<Text className={styles.title} variant="body5-accent">
					Краткий ответ
				</Text>
				<TextHtml className={styles.text} html={shortAnswer} />
			</Card>
			<Card expandable withOutsideShadow>
				<Text className={styles.title} variant="body5-accent">
					Развёрнутый ответ
				</Text>
				<TextHtml className={styles.text} html={longAnswer} />
			</Card>
		</>
	);
};
