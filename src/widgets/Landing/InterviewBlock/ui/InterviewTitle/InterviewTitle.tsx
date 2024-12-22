import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

import styles from './InterviewTitle.module.css';

export const InterviewTitle = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return (
		<>
			<h2 className={cn(styles.title, styles.desktop)}>{t(Landing.MAIN_TITLE_DESKTOP)}</h2>
			<h2 className={cn(styles.title, styles.tablet)}>{t(Landing.MAIN_TITLE_TABLET)}</h2>
			<h2 className={cn(styles.title, styles.mobile)}>{t(Landing.MAIN_TITLE_MOBILE)}</h2>
		</>
	);
};
