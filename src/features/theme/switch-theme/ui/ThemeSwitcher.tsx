import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { ThemeMods } from '../model/types/themeProvider';
import { applyTheme, getSavedTheme, getSystemTheme, removeSavedTheme } from '../utils/themeUtils';

import styles from './ThemeSwitcher.module.css';

/**
 * Theme switcher component.
 */

const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

export const ThemeSwitcher = () => {
	const [currentTheme, setCurrentTheme] = useState<ThemeMods>(getSavedTheme() || 'auto');

	/** Change theme */
	useLayoutEffect(() => {
		if (currentTheme === 'auto') {
			// For removing 'light' or 'dark' theme from localStorage on reloading the page in 'auto' mode
			removeSavedTheme();

			applyTheme(getSystemTheme());
		} else {
			applyTheme(currentTheme, true);
		}
	}, [currentTheme]);

	/** Changing the theme when changing the system theme */
	useEffect(() => {
		const changeSystemTheme = () => {
			currentTheme === 'auto' && applyTheme(getSystemTheme());
		};

		matchMedia.addEventListener('change', changeSystemTheme);
		return () => {
			matchMedia.removeEventListener('change', changeSystemTheme);
		};
	}, [currentTheme]);

	/** Caching function for repeated clicks */
	const handleChangeMode = useCallback(
		(themeName: ThemeMods) => () => setCurrentTheme(themeName),
		[],
	);

	return (
		<div>
			<button
				onClick={handleChangeMode('auto')}
				disabled={currentTheme === 'auto'}
				className={styles.btn}
			>
				auto
			</button>
			<button
				onClick={handleChangeMode('light')}
				disabled={currentTheme === 'light'}
				className={styles.btn}
			>
				light
			</button>
			<button
				onClick={handleChangeMode('dark')}
				disabled={currentTheme === 'dark'}
				className={styles.btn}
			>
				dark
			</button>
		</div>
	);
};
