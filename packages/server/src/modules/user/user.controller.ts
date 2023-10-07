import { IUser, USER_ROUTES } from '@MiN1One/interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { UserService } from './user.service';

@Controller(USER_ROUTES.ROOT)
@UseGuards(AuthGuard('ADMIN', 'MAINTAINER'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard('ADMIN'))
  createUser(@Body('user') user: IUser) {
    return this.userService.createUser(user);
  }

  @Get()
  @UseGuards(AuthGuard('ADMIN', 'MAINTAINER'))
  getAllUsers(@Query() query: Record<string, any>) {
    return this.userService.getAllUsers(query);
  }

  @Get(USER_ROUTES.SINGLE_USER)
  getSingleUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Patch(USER_ROUTES.SINGLE_USER)
  @UseGuards(AuthGuard('ADMIN', 'MAINTAINER', 'USER', 'LANDLORD'))
  updateUser(
    @Param('userId') userId: string,
    @Body('user') update: Partial<IUser>
  ) {
    return this.userService.updateUser(userId, update);
  }

  @Delete(USER_ROUTES.SINGLE_USER)
  @UseGuards(AuthGuard('ADMIN'))
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
