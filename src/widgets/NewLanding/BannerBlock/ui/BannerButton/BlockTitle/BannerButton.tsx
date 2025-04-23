import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

import styles from './BannerButton.module.css';

export const BannerButton = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return <button className={styles['banner-button']}>{t(Landing.BANNER_BUTTON)}</button>;
};
