import { useState } from 'react';

import { Switch } from '@/shared/ui/Switch';

import styles from './ThemeSwitcher.module.css';

export const ThemeSwitcher = () => {
	const [checked, setChecked] = useState(false);

	const onChange = () => {
		setChecked((prev) => !prev);
	};

	return (
		<Switch
			className={styles.switch}
			switchClassName={styles.wrapper}
			pinClassName={styles.pin}
			checked={checked}
			onChange={onChange}
		/>
	);
};

ThemeSwitcher.displayName = 'ThemeSwitcher';
