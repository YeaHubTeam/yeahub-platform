import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';

import styles from './BannerButton.module.css';

export const BannerButton = () => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.landing);

	const handleClickNavigation = () => {
		navigate(ROUTES.auth.register.page);
	};

	return (
		<Button
			size="x-large"
			variant="primary-inverse"
			className={styles['banner-button']}
			onClick={handleClickNavigation}
		>
			{t(Landing.BANNER_BUTTON)}
		</Button>
	);
};
