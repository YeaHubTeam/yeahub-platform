import path from 'path';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlInlineScriptPlugin from 'html-inline-script-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { WebpackOptions } from './types/types';

export const webpackPlugins = ({
	isDev,
	paths,
	envs,
}: WebpackOptions): Configuration['plugins'] => {
	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(paths.public, 'images/favicon.svg'),
		}),
		new DefinePlugin(envs),
		new Dotenv({
			path: paths.env,
			silent: true,
			systemvars: true,
		}),
	];

	if (isDev) {
		plugins.push(new ProgressPlugin());
		plugins.push(new ForkTsCheckerWebpackPlugin());
		plugins.push(new ReactRefreshWebpackPlugin());
		plugins.push(
			new CircularDependencyPlugin({
				failOnError: true,
			}),
		);
	} else {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			}),
		);
		plugins.push(
			new HtmlInlineScriptPlugin({
				scriptMatchPattern: [/initTheme\..+\.js$/],
			}),
		);
		plugins.push(
			new CopyPlugin({
				patterns: [
					{ from: paths.locales, to: paths.buildLocales },
					{ from: paths.robots, to: paths.output },
					{ from: paths.sitemap, to: paths.output },
				],
			}),
		);
		plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				openAnalyzer: false,
				reportFilename: 'bundle-report.html',
			}),
		);
		plugins.push(
			new CompressionPlugin({
				algorithm: 'gzip',
				test: /\.(js|css|html|svg|json)$/,
				filename: '[path][base].gz',
				threshold: 10240,
				minRatio: 0.8,
				deleteOriginalAssets: false,
			}),
		);
	}

	return plugins;
};
