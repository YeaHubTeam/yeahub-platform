import { applyTheme, getSavedTheme, getSystemTheme } from './themeUtils';

applyTheme(getSavedTheme() || getSystemTheme());
