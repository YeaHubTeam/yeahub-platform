import { Configuration } from 'webpack';

import { WebpackOptions } from './types/types';

export const webpackResolvers = (options: WebpackOptions): Configuration['resolve'] => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src,
    },
  };
};
