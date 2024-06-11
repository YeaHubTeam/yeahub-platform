import { FC } from 'react';

import { UserPreferences } from '@/shared/ui/UserPreferences';

import { ThemeSwitcher } from '@/features/theme/switch-theme';

import styles from './Header.module.css';

export const Header: FC = () => {
	return (
		<header className={styles.header}>
			<ThemeSwitcher />
			<UserPreferences />
		</header>
	);
};
