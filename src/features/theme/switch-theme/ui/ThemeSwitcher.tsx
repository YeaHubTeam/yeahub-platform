import { FC, useCallback, useEffect, useState } from 'react';

import { LS_THEME_KEY } from '../model/constants/themeConstants';
import { ThemeMods, Themes } from '../model/types/themeProvider';
import { getSystemTheme } from '../utils/themeUtils';

import styles from './ThemeSwitcher.module.css';

/**
 * Theme switcher component.
 * @description - Component has 2 states:
 * - currentTheme (color scheme, can have 2 values: 'light' or 'dark')
 * - selectedMode (selected mode, can have 3 values: 'auto', 'light' or 'dark')
 */

export const ThemeSwitcher: FC = () => {
	const savedTheme = (localStorage.getItem(LS_THEME_KEY) || 'auto') as ThemeMods;
	const systemTheme = getSystemTheme();

	const [currentTheme, setCurrentTheme] = useState<Themes>(
		savedTheme === 'auto' ? systemTheme : savedTheme,
	);
	const [selectedMode, setSelectedMode] = useState<ThemeMods>(savedTheme);

	/** Change mode */
	useEffect(() => {
		localStorage.setItem(LS_THEME_KEY, selectedMode);
		setCurrentTheme(selectedMode === 'auto' ? systemTheme : selectedMode);
	}, [selectedMode, systemTheme]);

	/** Render selected theme */
	useEffect(() => {
		document.documentElement.setAttribute('theme', currentTheme);
	}, [currentTheme]);

	/** Changing the theme when changing the system theme */
	useEffect(() => {
		const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

		const changeSystemTheme = () => {
			selectedMode === 'auto' && setCurrentTheme(getSystemTheme());
		};

		matchMedia.addEventListener('change', changeSystemTheme);

		return () => {
			matchMedia.removeEventListener('change', changeSystemTheme);
		};
	}, [selectedMode]);

	const handleChangeMode = useCallback(
		(themeName: ThemeMods) => () => setSelectedMode(themeName),
		[],
	);

	return (
		<div>
			<button
				onClick={handleChangeMode('auto')}
				disabled={selectedMode === 'auto'}
				className={styles.btn}
			>
				auto
			</button>
			<button
				onClick={handleChangeMode('light')}
				disabled={selectedMode === 'light'}
				className={styles.btn}
			>
				light
			</button>
			<button
				onClick={handleChangeMode('dark')}
				disabled={selectedMode === 'dark'}
				className={styles.btn}
			>
				dark
			</button>
		</div>
	);
};
