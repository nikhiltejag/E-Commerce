import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async create(userDTO: RegisterDTO) {

        const { username, password } = userDTO

        const user = await this.userRepo.findOne({ username })

        if (user) {
            throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST)
        }

        const newUser = this.userRepo.create({ username, password })

        const res = await this.userRepo.save(newUser)

        return res
    }

    async findByLogin(userDTO: LoginDTO) {
        const { username, password } = userDTO

        const user = await this.userRepo.findOne({ username, password })

        if (!user) {
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED)
        }

        return user
    }

    async getAllUsers() {
        const users = await this.userRepo.find()

        return users
    }

    async findByPayLoad(payload: any) {
        const { username } = payload
        return await this.userRepo.findOne({ username })
    }
}
