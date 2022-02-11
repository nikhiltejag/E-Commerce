import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserService } from 'src/shared/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // providers: [UserService]
})
export class AuthModule { }
