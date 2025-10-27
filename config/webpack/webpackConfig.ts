import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { Configuration, Entry } from 'webpack';

import { WebpackOptions } from './types/types';
import { webpackDevServer } from './webpackDevServer';
import { webpackLoaders } from './webpackLoaders';
import { webpackOutput } from './webpackOutput';
import { webpackPlugins } from './webpackPlugins';
import { webpackResolvers } from './webpackResolvers';

export const webpackConfig = (options: WebpackOptions): Configuration => {
	const { isDev, mode, paths } = options;

	const mainEntry: Entry = {
		main: [paths.entry],
	};

	const initThemeEntry: Entry = isDev
		? {}
		: {
				initTheme: [paths.initTheme] as string[],
			};

	return {
		cache: {
			type: 'filesystem',
			buildDependencies: {
				config: [__filename],
			},
		},
		mode: mode ?? 'development',
		entry: {
			...mainEntry,
			...initThemeEntry,
		},
		module: {
			rules: webpackLoaders(options),
		},
		resolve: webpackResolvers(options),
		output: webpackOutput(options),
		plugins: webpackPlugins(options),
		devServer: isDev ? webpackDevServer(options) : undefined,
		devtool: isDev ? 'inline-source-map' : 'source-map',
		optimization: {
			minimize: true,
			minimizer: ['...', new CssMinimizerPlugin()],
			chunkIds: 'deterministic',
			splitChunks: {
				chunks: 'all',
				minSize: 30000,
				maxInitialRequests: 8,
				cacheGroups: {
					react: {
						test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
						name: 'react',
						chunks: 'all',
						priority: 100,
						enforce: true,
					},
					text_editor: {
						test: /[\\/]node_modules[\\/](@tiptap|prosemirror|lowlight|highlight.js)[\\/]/,
						name: 'text-editor',
						chunks: 'all',
						priority: 90,
						enforce: true,
					},
					core: {
						test: /[\\/]node_modules[\\/](@reduxjs|react-redux|@sentry|react-hook-form|i18next|date-fns|yup|yup-password|react-router-dom|react-hot-toast)[\\/]/,
						name: 'core',
						priority: 80,
					},
					ui: {
						test: /[\\/]node_modules[\\/](react-slick|slick-carousel|react-calendar|react-cropper|react-responsive|react-device-detect|@floating-ui)[\\/]/,
						name: 'ui',
						priority: 70,
					},
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						priority: 10,
						minSize: 80000,
					},
				},
			},
			runtimeChunk: 'single',
			usedExports: true,
		},
	};
};
