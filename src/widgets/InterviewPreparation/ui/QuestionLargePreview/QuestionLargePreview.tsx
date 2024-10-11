import { Answers } from '@/entities/quiz';

import styles from './QuestionLargePreview.module.css';

interface QuestionLargePreviewProps {
	question: Answers;
}

export const QuestionLargePreview = ({ question }: QuestionLargePreviewProps) => {
	return (
		<>
			<div className={styles.question}>
				<h2 className={styles.questiontitle}>{question.questionTitle}</h2>
			</div>
		</>
	);
};
