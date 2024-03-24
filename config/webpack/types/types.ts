export interface WebpackPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
  public: string;
}

export type WebpackMode = 'production' | 'development';

export interface WebpackOptions {
  port: number;
  paths: WebpackPaths;
  mode: WebpackMode;
  isDev: boolean;
}
