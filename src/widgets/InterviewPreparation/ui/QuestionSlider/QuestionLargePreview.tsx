import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { Question } from '@/entities/question';

import styles from './QuestionLargePreview.module.css';

interface QuestionLargePreviewProps {
	question: Question;
}

export const QuestionLargePreview = ({ question }: QuestionLargePreviewProps) => {
	return (
		<>
			<div className={styles.question}>
				<h2>{question.title}</h2>
				<ImageWithWrapper
					src={question.imageSrc}
					alt={question.title}
					className={styles['image-wrapper']}
				/>
			</div>
		</>
	);
};
