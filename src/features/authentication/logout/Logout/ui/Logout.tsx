import LogoutIcon from '@/shared/assets/icons/logout-icon.svg';
import { Button } from '@/shared/ui/Button';

import { useLazyLogoutQuery } from '@/entities/auth';

import styles from './Logout.module.css';

export const Logout = () => {
	const [trigger] = useLazyLogoutQuery();
	const onLogout = () => {
		trigger();
	};
	return (
		<div className={styles['button-wrapper']}>
			<LogoutIcon className={styles.icon} />
			<Button variant="link" className={styles.button} onClick={onLogout}>
				Выйти
			</Button>
		</div>
	);
};
