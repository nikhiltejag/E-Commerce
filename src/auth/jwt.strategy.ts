import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretkey',
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    let user: User;
    try {
      user = await this.authService.validateUser(payload);
    } catch (error) {
      console.log(`error ${error}`);
    }

    if (!user) {
      return done(
        new HttpException('Unathorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    return done(null, user, payload.iat);
  }
}
