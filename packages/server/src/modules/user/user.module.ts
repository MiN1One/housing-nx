import { FactoryModule } from '@MiN1One/api-factory';
import { Module } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { appConfigLoader } from '../app/app.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<UserDocument>, appConfig) => ({
        model,
        appConfig,
      }),
      imports: [
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      inject: [getModelToken(User.name), appConfigLoader.KEY],
    }),
  ],
})
export class UserModule {}
