import { useTranslation } from 'react-i18next';

import LogoutIcon from '@/shared/assets/icons/logout.svg';
import { Translation } from '@/shared/config';
import { Button } from '@/shared/ui/Button';

import { useLazyLogoutQuery } from '@/entities/auth';

import styles from './LogoutButton.module.css';

export const LogoutButton = () => {
	const [trigger] = useLazyLogoutQuery();
	const onLogout = () => {
		trigger();
	};
	const { t } = useTranslation();
	return (
		<Button
			variant="link"
			className={styles.button}
			onClick={onLogout}
			preffix={<LogoutIcon className={styles.icon} />}
		>
			{t(Translation.LOGOUT)}
		</Button>
	);
};
