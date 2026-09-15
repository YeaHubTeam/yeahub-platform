import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import importX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

/**
 * FSD eslint plugins (`@feature-sliced/eslint-config`, `@conarti/eslint-plugin-feature-sliced`)
 * are eslintrc-era and call removed ESLint APIs (`context.getFilename`, string `ecmaVersion`).
 * Layer/public-api rules are covered by steiger; `import/no-internal-modules` and experimental
 * `import/order` from `@feature-sliced/eslint-config` are inlined below via
 * `eslint-plugin-import-x` (registered as `import` so existing disable comments stay valid).
 * `eslint-plugin-import@2.32` still calls ESLint APIs removed in v10.
 */
const FS_LAYERS = ['app', 'processes', 'pages', 'widgets', 'features', 'entities', 'shared'];
const FS_SEGMENTS = ['ui', 'model', 'lib', 'api', 'config', 'assets'];
const FS_SLICED_LAYERS_REG = FS_LAYERS.filter((layer) => layer !== 'shared').join('|');
const FS_SEGMENTS_REG = [...FS_SEGMENTS, ...FS_SEGMENTS.map((seg) => `${seg}.*`)].join('|');
const REVERSED_FS_LAYERS = [...FS_LAYERS].reverse();

export default defineConfig(
	{
		ignores: ['build/**', 'coverage/**', 'node_modules/**', 'storybook-static/**'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	react.configs.flat.recommended,
	react.configs.flat['jsx-runtime'],
	reactHooks.configs.flat.recommended,
	jsxA11y.flatConfigs.recommended,
	eslintPluginPrettierRecommended,
	{
		plugins: {
			import: importX,
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2022,
				__IS_DEV__: 'readonly',
			},
		},
		settings: {
			react: {
				// eslint-plugin-react@7.37.5 still calls context.getFilename() when
				// version is 'detect'; that API was removed in ESLint 10.
				version: '19.3',
			},
		},
		rules: {
			'prettier/prettier': ['error'],
			'react/function-component-definition': [
				2,
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
			'@typescript-eslint/no-shadow': 0,
			'import/prefer-default-export': 'off',
			'import/extensions': 'off',
			'import/no-absolute-path': 0,
			'import/no-internal-modules': [
				'error',
				{
					allow: [
						`**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})`,
						`**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,
						`**/*shared/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,
						`**/*shared/*(${FS_SEGMENTS_REG})`,
						`**/node_modules/**`,
						`**/*shared/_*`,
						`**/*shared/_*/*`,
					],
				},
			],
			'import/order': [
				'warn',
				{
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
					'newlines-between': 'always',
					pathGroups: REVERSED_FS_LAYERS.map((layer) => ({
						pattern: `**/?(*)${layer}{,/**}`,
						group: 'internal',
						position: 'after',
					})),
					pathGroupsExcludedImportTypes: ['builtin'],
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				},
			],
			'no-console': 1,
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/ban-ts-comment': 'error',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-explicit-any': 'error',
			// jest.polyfill.ts uses `require('node:worker_threads')`
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'padding-line-between-statements': 'error',
			'react/jsx-curly-brace-presence': ['error', 'never'],
			// TODO исправить на ошибку
			'react/jsx-max-depth': ['warn', { max: 5 }],
			// TODO исправить на ошибку
			'react-hooks/exhaustive-deps': 'warn',
			// TODO: React Compiler rules from eslint-plugin-react-hooks@7 recommended.
			// Fix incrementally, then restore 'error'. Do not disable rules-of-hooks.
			'react-hooks/set-state-in-effect': 'warn',
			'react-hooks/refs': 'warn',
			'react-hooks/purity': 'warn',
			'react-hooks/static-components': 'warn',
			'react-hooks/immutability': 'warn',
			'react-hooks/preserve-manual-memoization': 'warn',
			'react-hooks/set-state-in-render': 'warn',
			'react-hooks/error-boundaries': 'warn',
			'react-hooks/globals': 'warn',
			'react-hooks/use-memo': 'warn',
		},
	},
);
