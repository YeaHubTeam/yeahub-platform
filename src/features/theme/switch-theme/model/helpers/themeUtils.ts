import { getFromLS, setToLS, removeFromLS } from '@/shared/libs';

import { LS_THEME_KEY } from '../constants/themeConstants';
import { Themes } from '../types/themeProvider';

// /**
//  * @returns {'light' | 'dark'} - Determines the user's system preferred theme.
//  *
//  * We ask window if the user has dark mode enabled, if true, matches will be true.
//  */

// export const getSystemTheme = () =>
// 	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// /**
//  * Retrieves the stored color scheme from localStorage.
//  * @returns {'light' | 'dark' | null} - The stored color scheme or null if it is not stored.
//  */
// export function getSavedTheme(): Themes | null {
// 	return getFromLS(LS_THEME_KEY) as Themes | null;
// }

// /**
//  * Applies the specified theme to the root element of the document.
//  * If persist is set to true, saves the selected scheme in localStorage.
//  * @param {'light' | 'dark'} theme - The theme to apply.
//  * @param {boolean} persist - A flag indicating whether to save the theme in localStorage.
//  * @returns {void}
//  */
// export const applyTheme = (theme: Themes, persist: boolean = false): void => {
// 	document.documentElement.setAttribute('theme', theme);
// 	persist && setToLS(LS_THEME_KEY, theme);
// };

// /**
//  * Removes the stored theme from localStorage.
//  * @returns {void}
//  */
// export const removeSavedTheme = () => {
// 	removeFromLS(LS_THEME_KEY);
// };

/**
 * Determines the user's system preferred theme.
* @returns {'light' } - The system preferred theme.

 * We ask window if the user has dark mode enabled, if true, matches will be true.
 */
export const getSystemTheme = (): Themes => 'light';

/**
 * Retrieves the stored color scheme from localStorage.
 * @returns {'light' | null} - The stored color scheme or null if it is not stored.
 */
export function getSavedTheme(): Themes | null {
	return getFromLS(LS_THEME_KEY) as Themes | null;
}

/**
 * Applies the specified theme to the root element of the document.
 * If persist is set to true, saves the selected scheme in localStorage.
 * @param {'light'} theme - The theme to apply.
 * @param {boolean} persist - A flag indicating whether to save the theme in localStorage.
 * @returns {void}
 */
export const applyTheme = (theme: Themes, persist: boolean = false): void => {
	document.documentElement.setAttribute('theme', theme);
	persist && setToLS(LS_THEME_KEY, theme);
};

/**
 * Removes the stored theme from localStorage.
 * @returns {void}
 */
export const removeSavedTheme = () => {
	removeFromLS(LS_THEME_KEY);
};
