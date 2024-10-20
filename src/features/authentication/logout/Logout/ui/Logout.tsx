import { Button } from 'yeahub-ui-kit';

import LogoutIcon from '@/shared/assets/icons/logout-icon.svg';

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
			<Button tagName="a" theme="link" className={styles.button} onClick={onLogout}>
				Выйти
			</Button>
		</div>
	);
};
