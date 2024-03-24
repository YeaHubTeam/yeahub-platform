import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';

import { WebpackOptions } from './types/types';

export const webpackLoaders = ({ isDev }: WebpackOptions): ModuleOptions['rules'] => {
  const cssLoader = {
    test: /\.css$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
          },
        },
      },
      'postcss-loader',
    ],
  };

  const assetLoader = {
    test: /\.(png|jpep|jpg|gif|ico|webp|woff|woff2|ttf|)$/i,
    type: 'asset/resource',
  };

  const babelLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  };

  const svgLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  return [cssLoader, assetLoader, babelLoader, svgLoader];
};
