import cn from 'classnames';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './InterviewTitle.module.css';

export const InterviewTitle = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);
	return (
		<>
			<h2 className={cn(styles.title, styles.desktop)}>{t(Landing.HEADER)}</h2>
			<h2 className={cn(styles.title, styles.tablet)}>{t(Landing.HEADER_TABLET)}</h2>
			<h2 className={cn(styles.title, styles.mobile)}>{t(Landing.HEADER_MOBILE)}</h2>
		</>
	);
};
