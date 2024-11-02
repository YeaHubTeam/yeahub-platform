import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './Progress.module.css';

export const Progress = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<div className={styles.container}>
			<p>{t(Landing.PROGRESS)}</p>
			<span>{t(Landing.PROGRESS_DESCRIPTION)}</span>
			<ul className={styles['progress-bar']}>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	);
};
