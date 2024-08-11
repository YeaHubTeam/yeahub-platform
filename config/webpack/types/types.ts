export interface WebpackPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
  public: string;
  initTheme: string | null;
  env: string;
  locales: string;
  buildLocales: string;
}

export type WebpackMode = 'production' | 'development';

export interface WebpackOptions {
  port: number;
  paths: WebpackPaths;
  mode: WebpackMode;
  isDev: boolean;
  envs: {
    [key: string]: string | number;
  };
}
