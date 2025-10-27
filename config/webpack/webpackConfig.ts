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
			splitChunks: {
				chunks: 'all',
				minSize: 244 * 1024,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
			runtimeChunk: 'single',
			usedExports: true,
			minimizer: ['...', new CssMinimizerPlugin()],
		},
	};
};
