import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewHistory } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './InterviewHeader.module.css';

type InterviewHeaderProps = {
	title: string;
};

export const InterviewHeader = ({ title }: InterviewHeaderProps) => {
	const { t } = useI18nHelpers(i18Namespace.interviewHistory);

	return (
		<div className={styles.header}>
			<h3>{title}</h3>
			<div className={styles.link}>
				<span>{t(InterviewHistory.LINK_TEXT)}</span>
				<Icon icon="caretRight" size={20} color="--palette-ui-purple-700" className={styles.icon} />
			</div>
		</div>
	);
};
