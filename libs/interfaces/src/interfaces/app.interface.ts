export interface IAppConfig {
  dbUrl: string;
  appPort: number;
  jwtKey: string;
  jwtExpiresIn: string;
  isDevelopment: boolean;
}