import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } =
      context.switchToHttp().getRequest() ||
      GqlExecutionContext.create(context).getContext().req;
    return user?.role.some((role: string) => role === 'ADMIN');
  }
}
