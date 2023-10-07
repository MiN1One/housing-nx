export interface IAppConfig {
  dbUrl: string;
  appPort: number;
  jwtKey: string;
  jwtExpiresIn: string;
  cookieSecret: string;
  isDevelopment: boolean;
}
