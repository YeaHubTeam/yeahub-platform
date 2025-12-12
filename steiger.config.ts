import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
	...fsd.configs.recommended,
	{
		files: ['./src/**'],
		rules: {
			'fsd/insignificant-slice': 'off',
		},
	},
	{
		files: ['./src/app/**'],
		rules: {
			'fsd/no-public-api-sidestep': 'off',
		},
	},
	{
		files: ['./src/widgets/**'],
		rules: {
			'fsd/repetitive-naming': 'warn',
		},
	},
	{
		files: ['./src/shared/libs/redux/**', './src/shared/config/redux/**'],
		rules: {
			'fsd/forbidden-imports': 'warn',
			'fsd/no-public-api-sidestep': 'warn',
		},
	},
]);
