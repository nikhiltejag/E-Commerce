import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { User as UserDTO } from '../entities/user.entity';
import { User } from '../utilities/user.decorator';
import { Roles } from 'src/utilities/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll(@User() user: any) {
    return { auth: 'works' };
  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);

    const payload = {
      username: user.username,
    };

    const jwtToken = await this.authService.signPayLoad(payload);

    return { payload, jwtToken };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);

    const payload = {
      username: user.username,
    };

    const jwtToken = await this.authService.signPayLoad(payload);

    return { payload, jwtToken };
  }

  @Get('all-users')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Put('change-priv/:id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  changePrivlagesOfUser(@Param('id') id: string, @Body() privilages) {
    return this.userService.changePrivilages(id, privilages);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteUser(@User() user: UserDTO, @Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
