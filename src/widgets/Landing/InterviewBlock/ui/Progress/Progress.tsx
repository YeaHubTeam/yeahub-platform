import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

import styles from './Progress.module.css';

export const Progress = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<div className={styles.container}>
			<p>{t(Landing.MAIN_PROGRESS_TITLE)}</p>
			<span>{t(Landing.MAIN_PROGRESS_DESCRIPTION)}</span>
			<ul className={styles['progress-bar']}>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	);
};
