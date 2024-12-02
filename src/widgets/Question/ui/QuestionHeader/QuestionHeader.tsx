import { i18Namespace } from '@/shared/config/i18n/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
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
	const { t } = useI18nHelpers(i18Namespace.questions);

	const questionStatuses: Record<QuestionStatus, string> = {
		public: t(Questions.STATUS_PUBLIC),
		draft: t(Questions.STATUS_DRAFT),
	};

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
