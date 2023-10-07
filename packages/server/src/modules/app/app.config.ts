import { IAppConfig } from '@MiN1One/interfaces';
import { registerAs } from '@nestjs/config';

export const appConfigLoader = registerAs<IAppConfig>('appConfig', () => ({
  dbUrl: process.env.DB_URL,
  appPort: +process.env.PORT,
  jwtKey: process.env.JWT_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  cookieSecret: process.env.COOKIE_SECRET,
  isDevelopment: process.env.NODE_ENV === 'development',
}));
