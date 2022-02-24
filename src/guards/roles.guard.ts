import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const userRoles = req.user.roles.map((each) => each.name);

    const reqRoles = this.reflector.getAllAndMerge('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    return reqRoles.every((each) => userRoles.includes(each));
  }
}
