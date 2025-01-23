import { useTranslation } from 'react-i18next';

import LogoutIcon from '@/shared/assets/icons/logout-icon.svg';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

import { useLazyLogoutQuery } from '@/entities/auth';

import styles from './Logout.module.css';

export const Logout = () => {
	const [trigger] = useLazyLogoutQuery();
	const onLogout = () => {
		trigger();
	};
	const { t } = useTranslation();
	return (
		<div className={styles['button-wrapper']}>
			<LogoutIcon className={styles.icon} />
			<Button variant="link" className={styles.button} onClick={onLogout}>
				{t(Translation.LOGOUT)}
			</Button>
		</div>
	);
};
