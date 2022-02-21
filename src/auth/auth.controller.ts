import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from '../utilities/user.decorator'
import { SellerGuard } from 'src/guards/seller.guard';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    findAll(@User() user: any) {
        console.log(user)
        return { auth: 'works' }
    }

    @Post('login')
    async login(@Body() userDTO: LoginDTO) {
        const user = await this.userService.findByLogin(userDTO)

        const payload = {
            username: user.username,
            seller: user.seller
        }

        const jwtToken = await this.authService.signPayLoad(payload)

        return { payload, jwtToken }
    }

    @Post('register')
    async register(@Body() userDTO: RegisterDTO) {
        const user = await this.userService.create(userDTO)

        const payload = {
            username: user.username,
            seller: user.seller
        }

        const jwtToken = await this.authService.signPayLoad(payload)

        return { payload, jwtToken }

    }

    @Get('all-users')
    async getAllUsers() {
        return await this.userService.getAllUsers()
    }
}
