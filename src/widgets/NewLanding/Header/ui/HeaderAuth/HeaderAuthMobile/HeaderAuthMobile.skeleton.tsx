import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import styles from './HeaderAuthMobile.module.css';

export const HeaderAuthMobileSkeleton = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<IconButtonSkeleton
			className={styles['burger-button-skeleton']}
			aria-label={t(Landing.HEADER_AUTH_ICONBUTTON_ARIA_LABEL)}
		/>
	);
};
