import type { StorybookConfig } from '@storybook/react-webpack5';

import { storybookWebpack } from './webpack.config.ts';

const config: StorybookConfig = {
	stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-docs',
		{
			name: '@storybook/addon-styling-webpack',
			options: {
				rules: [
					{
						test: /\.css$/,
						sideEffects: true,
						use: [
							'style-loader',
							{
								loader: 'css-loader',
								options: {
									importLoaders: 1,
									modules: {
										auto: true,
										localIdentName: '[path][name]__[local]--[hash:base64:5]',
										namedExport: false,
										exportLocalsConvention: 'as-is',
									},
								},
							},
							'postcss-loader',
						],
					},
				],
			},
		},
		'storybook-react-i18next',
		'@storybook/addon-webpack5-compiler-swc',
	],
	staticDirs: ['../../public'],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	typescript: {
		reactDocgen: 'react-docgen',
	},
	swc: () => ({
		jsc: {
			transform: {
				react: {
					runtime: 'automatic',
				},
			},
		},
	}),
	webpackFinal: async (config) => storybookWebpack({ config }),
};

export default config;
