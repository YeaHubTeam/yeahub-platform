import { Card } from '@/shared/ui/Card';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { QuestionStatus, questionStatuses } from '@/entities/question';

import styles from './QuestionHeader.module.css';

interface QuestionHeaderProps {
	title: string;
	description: string;
	status: QuestionStatus;
}

export const QuestionHeader = ({ title, description, status }: QuestionHeaderProps) => {
	return (
		<Card withOutsideShadow>
			<div className={styles['question-header-wrapper']}>
				<div className={styles['image-wrapper']}>
					<ImageWithWrapper className={styles.image} />
				</div>
				<div className={styles['title-wrapper']}>
					<h2 className={styles.title}>{title}</h2>
					<p className={styles.description}>{description}</p>
				</div>
				<div className={styles['label-wrapper']}>
					<p className={styles.label}>{questionStatuses[status]}</p>
				</div>
			</div>
		</Card>
	);
};
