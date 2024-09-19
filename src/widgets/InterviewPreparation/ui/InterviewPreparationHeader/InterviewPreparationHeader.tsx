import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';

import styles from './InterviewPreparationHeader.module.css';

interface InterviewPreparationHeaderProps {
	title: string;
	link: string;
	active: boolean;
}

export const InterviewPreparationHeader = ({
	title,
	link,
	active,
}: InterviewPreparationHeaderProps) => {
	const { t } = useI18nHelpers(i18Namespace.interview);
	return (
		<div className={styles.header}>
			<h3 className={styles['header-title']}>{title}</h3>
			<LinkWithArrowRight
				link={link}
				linkTitle={t(
					active ? Interview.PREPARATION_ACTIVELINKTEXT : Interview.PREPARATION_NOACTIVELINKTEXT,
				)}
			/>
		</div>
	);
};
