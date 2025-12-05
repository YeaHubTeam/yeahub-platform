import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import styles from './HeaderAuthMobile.module.css';

export const HeaderAuthMobileSkeleton = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<IconButtonSkeleton
			dataTestId={'HeaderAuthMobileSkeleton'}
			className={styles['burger-button-skeleton']}
			aria-label={t(Landing.HEADER_AUTH_ICONBUTTON_ARIA_LABEL)}
		/>
	);
};
