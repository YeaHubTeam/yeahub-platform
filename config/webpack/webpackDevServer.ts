import { readFileSync } from 'fs';
import path from 'path';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { WebpackOptions } from './types/types';

export const webpackDevServer = ({ port }: WebpackOptions): DevServerConfiguration => {
  return {
    port: port ?? 3001,
    open: true,
    historyApiFallback: true,
    hot: true,
    https: {
      key: readFileSync(path.resolve(__dirname, '..', '..', 'cert', 'localhost.key')),
      cert: readFileSync(path.resolve(__dirname, '..', '..', 'cert', 'localhost.crt')),
    },
  };
};
