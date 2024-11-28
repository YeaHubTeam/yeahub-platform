import { Card } from '@/shared/ui/Card';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import styles from './QuestionHeader.module.css';

interface QuestionHeaderProps {
	title?: string;
	description?: string;
	status?: string;
	isMobile?: boolean;
	isTablet?: boolean;
}

//todo доработать проброс картинки вопроса.

export const QuestionHeader = ({
	title,
	description,
	status,
	isMobile,
	isTablet,
}: QuestionHeaderProps) => {
	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<div className={styles['question-header-wrapper']}>
				<div className={styles['image-wrapper']}>
					<ImageWithWrapper className={styles.image} isMobile={isMobile} isTablet={isTablet} />
				</div>
				<div className={styles['title-wrapper']}>
					<h2 className={styles.title}>{title}</h2>
					<p className={styles.description}>{description}</p>
				</div>
				{!(isMobile || isTablet) && (
					<div className={styles['label-wrapper']}>
						<p className={styles.label}>{status}</p>
					</div>
				)}
			</div>
		</Card>
	);
};
