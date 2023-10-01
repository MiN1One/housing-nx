import { IAppConfig, UserTypes } from '@MiN1One/interfaces';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import * as jwt from 'jsonwebtoken';
import { appConfigLoader } from '../../modules/app/app.config';
import { UserService } from '../../modules/user/user.service';

export const AuthGuard = (...allowedFor: UserTypes[]) => {
  @Injectable()
  class AuthGuard implements CanActivate {
    constructor(
      @Inject(appConfigLoader.KEY)
      readonly appConfig: IAppConfig,

      readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const request = context.switchToHttp().getRequest();

        if (!request.cookies?.authToken) {
          return false;
        }

        const decodedToken = jwt.verify(
          request.cookies.authToken,
          this.appConfig.jwtKey
        ) as {
          userId: string;
          iat: number;
          exp: number;
        };

        const user = await this.userService.getUser(decodedToken.userId);

        if (
          !allowedFor.includes(user.role) ||
          (user.passwordChangedAt &&
            user.hasPasswordChanged(decodedToken.iat, user.passwordChangedAt))
        ) {
          return false;
        }

        request.userId = user._id.toString();
        return true;
      } catch (er) {
        if (er instanceof jwt.TokenExpiredError) {
          const response = context.switchToHttp().getResponse() as FastifyReply;
          response.clearCookie('authToken', {
            path: '/',
          });
          response.redirect(302, 'http://localhost:4200/login');
        }
        return false;
      }
    }
  }

  return AuthGuard;
};
