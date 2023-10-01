import { IAppConfig } from '@MiN1One/interfaces';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { appConfigLoader } from '../app/app.config';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,

    @Inject(appConfigLoader.KEY)
    private readonly appConfig: IAppConfig
  ) {}

  signToken(userId: string) {
    return jwt.sign({ userId }, this.appConfig.jwtKey, {
      expiresIn: this.appConfig.jwtExpiresIn,
    });
  }

  async login(userLoginDto: LoginDto) {
    const { password, login } = userLoginDto;
    const isPhoneNumLogin = !isNaN(parseInt(login));
    const user = await this.userService.getSingleUserByQuery(
      {
        [isPhoneNumLogin ? 'phoneNumber' : 'email']: login,
      },
      'password'
    );
    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
      throw new UnauthorizedException(
        'Incorrect credentials! Please check your password or login.'
      );
    }
    return this.signToken(user.id);
  }

  async signup(userSignupDto: SignupDto) {
    const newUser = await this.userService.createUser({
      lastName: userSignupDto.lastName,
      firstName: userSignupDto.firstName,
      email: userSignupDto.email,
      password: userSignupDto.password,
      phoneNumber: userSignupDto.phoneNumber,
      maritalStatus: userSignupDto.maritalStatus,
    });
    newUser.password = undefined;
    return newUser;
  }
}
