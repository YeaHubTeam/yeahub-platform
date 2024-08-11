import { readFileSync } from 'fs';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { WebpackOptions } from './types/types';

export const webpackDevServer = ({ port, paths }: WebpackOptions): DevServerConfiguration => {
  return {
    port: port ?? 3001,
    open: true,
    historyApiFallback: true,
    hot: true,
    https: {
      key: readFileSync(paths.httpsKey),
      cert: readFileSync(paths.httpsCert),
    },
  };
};
