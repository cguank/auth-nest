import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Role, Roles } from './common/roles.decorator';
import { RolesGuard } from './guard/roles.guard';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'this.appService.getHello()';
  }

  

  @UseGuards(AuthGuard('jwt'))
  @Get('user/current')
  async currentUser(@Request() req) {
    return req.user
  }

  
}
