import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Roles, Role } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService,private authService: AuthService) { }
  
  @Post('/register')
  async register(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto)
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/findall')
  async findAll() {
    return this.userService.findAll()
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update')
  async update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto)
  }
}
