import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/entities/role.entity';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
