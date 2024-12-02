import { useScreenSize } from '@/shared/hooks/useScreenSize';
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
	const { isDesktop, isMobile } = useScreenSize();

	const imageClassName = isMobile ? styles['image-mobile'] : styles['image-default'];

	return (
		<Card withOutsideShadow>
			<div className={styles['question-header-wrapper']}>
				{isDesktop ? (
					<div
						className={`${styles['image-wrapper']} ${
							isMobile ? styles['image-wrapper-mobile'] : ''
						}`}
					>
						<ImageWithWrapper className={imageClassName} src={''} />
					</div>
				) : null}
				<div className={styles['title-wrapper']}>
					<h2 className={styles.title}>{title}</h2>
					<p className={styles.description}>{description}</p>
				</div>
				{isDesktop && (
					<div className={styles['label-wrapper']}>
						<p className={styles.label}>{questionStatuses[status]}</p>
					</div>
				)}
			</div>
		</Card>
	);
};
