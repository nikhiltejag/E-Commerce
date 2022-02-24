import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  async createBasicRoles() {
    const userRoleProp = {
      name: 'user',
      description: 'Browse products | create orders | add prod to orders',
    };
    const userRole = this.roleRepo.create(userRoleProp);
    await this.roleRepo.save(userRole);

    const sellerRoleProp = {
      name: 'seller',
      description:
        'Browse products | create order | add prod to orders | create products | update product details',
    };
    const sellerRole = this.roleRepo.create(sellerRoleProp);
    await this.roleRepo.save(sellerRole);

    const adminRoleProp = {
      name: 'admin',
      description:
        'Browse products | create order | add prod to orders | create products | update product details | manage user and seller accounts',
    };
    const adminRole = this.roleRepo.create(adminRoleProp);
    await this.roleRepo.save(adminRole);
  }

  async create(userDTO: RegisterDTO) {
    const { username, password, seller, admin } = userDTO;

    const user = await this.userRepo.findOne({ username });

    if (user) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userRole = await this.roleRepo.findOne({ name: 'user' });
    const newUser = this.userRepo.create({
      username,
      password,
      seller,
      roles: [userRole],
    });

    if (admin || seller) {
      const sellerRole = await this.roleRepo.findOne({ name: 'seller' });
      newUser.roles = [...newUser.roles, sellerRole];
      if (admin) {
        const adminRole = await this.roleRepo.findOne({ name: 'admin' });
        newUser.roles = [...newUser.roles, adminRole];
      }
    }

    const res = await this.userRepo.save(newUser);
    return res;
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;

    const user = await this.userRepo.findOne({ username, password });

    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepo.find();

    return users;
  }

  async findByPayLoad(payload: any) {
    const { username } = payload;
    return await this.userRepo.findOne({ username });
  }
}
