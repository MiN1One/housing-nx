import { AUTH_ROUTES } from '@MiN1One/interfaces';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller()
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post(AUTH_ROUTES.LOGIN)
  async login(
    @Body() userLoginDto: LoginDto,
    @Res({ passthrough: true }) response: FastifyReply
  ) {
    const token = await this.authService.login(userLoginDto);
    response.setCookie('authToken', token, {
      path: '/',
      httpOnly: true,
    });
    return {};
  }

  @Post(AUTH_ROUTES.SIGNUP)
  signup(@Body() userSignupDto: SignupDto) {
    return this.authService.signup(userSignupDto);
  }
}
