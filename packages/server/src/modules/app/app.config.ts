import { registerAs } from '@nestjs/config';

export const appConfigLoader = registerAs('appConfig', () => ({
  dbUrl: process.env.DB_URL,
  appPort: process.env.PORT,
  jwtKey: process.env.JWT_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN
})); 