import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { IUser, USER_ROUTES } from '@MiN1One/interfaces';
import { UserService } from "./user.service";

@Controller(USER_ROUTES.ROOT)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  createUser(@Body('user') user: IUser) {
    return this.userService.createUser(user);
  }

  @Get()
  getAllUsers(@Query() query: Record<string, any>) {
    return this.userService.getAllUsers(query);
  }
}