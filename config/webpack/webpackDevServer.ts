import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { WebpackOptions } from './types/types';

export const webpackDevServer = ({ port }: WebpackOptions): DevServerConfiguration => {
  return {
    port: port ?? 3000,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
};
