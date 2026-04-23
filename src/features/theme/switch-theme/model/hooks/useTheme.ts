import { useCallback, useState } from 'react';

import { applyTheme, getSavedTheme, getSystemTheme } from '../helpers/themeUtils';
import { Themes } from '../types/themeProvider';

export const useTheme = () => {
	const getInitialTheme = (): Themes => getSavedTheme() || getSystemTheme();
	const [theme, setThemeState] = useState<Themes>(getInitialTheme);

	const setTheme = useCallback((newTheme: Themes) => {
		applyTheme(newTheme, true);
		setThemeState(newTheme);
	}, []);

	const toggleTheme = useCallback(() => {
		const newTheme: Themes = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	}, [theme, setTheme]);

	return { theme, setTheme, toggleTheme, isLight: theme === 'light' };
};
