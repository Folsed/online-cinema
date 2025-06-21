import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(executionContext: ExecutionContext) {
        const req = executionContext.switchToHttp().getRequest<Request>();
        return req.isAuthenticated();
    }
}
