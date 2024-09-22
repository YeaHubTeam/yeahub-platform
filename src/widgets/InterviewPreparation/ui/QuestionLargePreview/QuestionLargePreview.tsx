import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

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
				<ImageWithWrapper
					src={question.imageSrc}
					alt={question.questionTitle}
					className={styles['image-wrapper']}
				/>
			</div>
		</>
	);
};
