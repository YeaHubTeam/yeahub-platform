import { Configuration } from 'webpack';

import { WebpackOptions } from './types/types';

export const webpackOutput = ({ paths }: WebpackOptions): Configuration['output'] => {
  return {
    path: paths.output,
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  };
};
