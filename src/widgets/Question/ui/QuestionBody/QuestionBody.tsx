import { useState } from 'react';

import { Card } from '@/shared/ui/Card';
import { TextHtml } from '@/shared/ui/TextHtml';

import styles from './QuestionBody.module.css';

interface QuestionBodyProps {
	shortAnswer?: string;
	longAnswer?: string;
}

export const QuestionBody = ({ shortAnswer, longAnswer }: QuestionBodyProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<>
			<Card className={styles.wrapper}>
				<h3 className={styles.title}>Краткий ответ</h3>
				<p className={styles.text}>
					<TextHtml html={shortAnswer ?? 'Краткий ответ отсутствует'} />
				</p>
			</Card>
			<Card
				expandable
				className={isExpanded ? styles['collapse expand'] : styles.collapse}
				onExpandChange={setIsExpanded}
			>
				<h3 className={styles.title}>Развёрнутый ответ</h3>
				<p className={styles.text}>
					<TextHtml html={longAnswer ?? 'Ответ отсутствует'} />
				</p>
			</Card>
		</>
	);
};
