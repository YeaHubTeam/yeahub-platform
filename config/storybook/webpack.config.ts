import path from 'path';

import webpack, { RuleSetRule } from 'webpack';

export const storybookWebpack = ({ config }: { config: webpack.Configuration }) => {
  config.resolve.modules.push(path.resolve(__dirname, '..', '..', 'src'));
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = {
    ...config!.resolve!.alias,
    '@': path.resolve(__dirname, '..', '..', 'src'),
  };

  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }
    return rule;
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  return config;
};
