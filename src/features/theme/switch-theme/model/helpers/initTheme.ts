import { Themes } from '../types/themeProvider';

import { applyTheme, getSavedTheme, getSystemTheme } from './themeUtils';

export const initTheme = () => {
	const savedTheme = getSavedTheme();
	const theme: Themes = savedTheme ?? getSystemTheme();
	const shouldPersist = !savedTheme;

	applyTheme(theme, shouldPersist);
};
