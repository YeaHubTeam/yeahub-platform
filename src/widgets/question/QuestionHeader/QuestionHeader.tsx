import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import styles from './QuestionHeader.module.css';

interface QuestionHeaderProps {
	title: string;
	description: string;
}

export const QuestionHeader = ({ title, description }: QuestionHeaderProps) => {
	const { isDesktop, isMobile } = useScreenSize();

	const imageClassName = isMobile ? styles['image-mobile'] : styles['image-default'];

	return (
		<Card withOutsideShadow>
			{isMobile ? (
				<div className={styles['question-header-wrapper']}>
					<div className={styles['title-wrapper']}>
						<Text className={styles.title} variant="body6">
							{title}
						</Text>
					</div>
					<div className={styles['description-wrapper']}>
						<Text variant="body3-accent" color="black-700">
							{description}
						</Text>
					</div>
				</div>
			) : (
				<div className={styles['question-header-wrapper']}>
					{isDesktop && (
						<div className={styles['image-wrapper']}>
							<ImageWithWrapper className={imageClassName} src={''} />
						</div>
					)}
					<div className={styles['title-wrapper']}>
						<Text variant="body6">{title}</Text>
						<Text variant="body3">{description}</Text>
					</div>
				</div>
			)}
		</Card>
	);
};
