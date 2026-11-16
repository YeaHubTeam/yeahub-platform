import path from 'node:path';

import webpack from 'webpack';
import type { Configuration, RuleSetRule } from 'webpack';

const srcDir = path.resolve(import.meta.dirname, '..', '..', 'src');

export const storybookWebpack = ({ config }: { config: Configuration }) => {
	config.resolve = config.resolve || {};
	config.resolve.modules = config.resolve.modules || [];
	config.resolve.extensions = config.resolve.extensions || [];
	config.module = config.module || { rules: [] };

	const rules = (config.module.rules || []).filter(
		(rule): rule is RuleSetRule => typeof rule === 'object' && rule !== null && 'test' in rule,
	);

	config.resolve.modules.push(srcDir);

	config.resolve.extensions.push('.ts', '.tsx');
	config.resolve.alias = {
		...config.resolve.alias,
		'@': srcDir,
	};

	config.module.rules = rules.map((rule: RuleSetRule) => {
		if (/svg/.test(rule.test as string)) {
			return { ...rule, exclude: /\.svg$/i };
		}
		return rule;
	});

	config.module.rules.push({
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	});

	config.module.rules.push({
		test: /\.avif$/i,
		type: 'asset/resource',
	});

	config.plugins = config.plugins || [];
	config.plugins.push(
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(true),
		}),
	);

	return config;
};
