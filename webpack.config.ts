import path from 'path';

import type { Configuration } from 'webpack';

import { WebpackMode, WebpackOptions, WebpackPaths } from './config/webpack/types/types';
import { webpackConfig } from './config/webpack/webpackConfig';

interface EnvVariables {
  mode: WebpackMode;
  port: number;
}

export default (env: EnvVariables) => {
  const paths: WebpackPaths = {
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    initTheme: path.resolve(
      __dirname,
      'src',
      'features',
      'theme',
      'switch-theme',
      'utils',
      'initTheme.ts',
    ),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
    env: path.resolve(__dirname, '.env'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
  };
  const isDev = env.mode === 'development';
  const options: WebpackOptions = {
    port: env.port ?? 3000,
    mode: env.mode,
    isDev,
    paths,
  };

  const config: Configuration = webpackConfig(options);
  return config;
};
