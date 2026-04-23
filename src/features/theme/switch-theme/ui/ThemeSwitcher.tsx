import { Switch } from '@/shared/ui/Switch';

import { useTheme } from '../model/hooks/useTheme';

import styles from './ThemeSwitcher.module.css';

export const ThemeSwitcher = () => {
	const { isLight, toggleTheme } = useTheme();

	return (
		<Switch
			className={styles.switch}
			switchClassName={styles.wrapper}
			pinClassName={styles.pin}
			checked={isLight}
			onChange={toggleTheme}
		/>
	);
};

ThemeSwitcher.displayName = 'ThemeSwitcher';
