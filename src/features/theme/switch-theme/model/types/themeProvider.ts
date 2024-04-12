export type ThemeMods = 'auto' | 'light' | 'dark';
export type Themes = Exclude<ThemeMods, 'auto'>;
