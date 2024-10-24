import { Themes } from '../model/types/themeProvider';

import { applyTheme, getSavedTheme, getSystemTheme } from './themeUtils';

// applyTheme(getSavedTheme() || getSystemTheme());
const theme: Themes = getSavedTheme() || getSystemTheme();
applyTheme(theme);
