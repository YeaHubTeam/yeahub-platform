import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { QuestionStatus } from '@/entities/question';

import styles from './QuestionHeader.module.css';

interface QuestionHeaderProps {
	title: string;
	description: string;
	status: QuestionStatus;
}

export const QuestionHeader = ({ title, description, status }: QuestionHeaderProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	const { isDesktop, isMobile } = useScreenSize();

	const imageClassName = isMobile ? styles['image-mobile'] : styles['image-default'];

	const questionStatuses: Record<QuestionStatus, string> = {
		public: t(Questions.STATUS_PUBLIC),
		draft: t(Questions.STATUS_DRAFT),
	};

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
