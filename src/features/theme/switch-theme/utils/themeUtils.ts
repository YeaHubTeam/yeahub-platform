export const getSystemTheme = () =>
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
