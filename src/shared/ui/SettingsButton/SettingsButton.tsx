import { FC } from 'react';

import Settings from '@/shared/assets/icons/settings.svg';

import styles from './SettingsButton.module.css';

export const SettingsButton: FC = () => {
	return (
		<button className={styles.button} type="button" aria-label="Settings">
			<Settings className={styles.icon} />
		</button>
	);
};
