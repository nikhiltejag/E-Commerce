import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signPayLoad(payload: any) {
        return sign(payload, 'secretkey', { expiresIn: '12h' })
    }

    async validateUser(payload: any) {
        const user = await this.userService.findByPayLoad(payload)

        return user
    }
}
