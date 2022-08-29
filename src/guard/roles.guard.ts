import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/common/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getHandler()
    ])
    if (!requireRoles) return true;
    const { user } = context.switchToHttp().getRequest()
    Logger.debug(`role guard user ${user.roles}`)
    return requireRoles.some(role => user.roles.includes(role))
  }
}