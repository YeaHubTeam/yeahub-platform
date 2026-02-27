import { readFileSync } from 'fs';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { WebpackOptions } from './types/types';

export const webpackDevServer = ({
	port,
	paths,
	notSsl,
}: WebpackOptions): DevServerConfiguration => {
	const devServerConfig: DevServerConfiguration = {
		port: port ?? 3001,
		open: process.env.BROWSER
			? {
					app: {
						name: process.env.BROWSER,
					},
				}
			: true,
		historyApiFallback: true,
		hot: true,
	};

	if (!notSsl) {
		devServerConfig.server = {
			type: 'https',
			options: {
				cert: readFileSync(paths.httpsCert),
				key: readFileSync(paths.httpsKey),
			},
		};
	}

	return devServerConfig;
};
