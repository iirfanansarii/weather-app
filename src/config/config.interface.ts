export interface Config {
  app: {
    name: string;
    description: string;
    version: string;
  };
  port: number;
  host: string;
  isProd: boolean;
}
