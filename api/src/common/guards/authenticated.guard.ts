import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import auth from '../../config/auth';
import { pickAuthHeaders } from '../utils/http.util';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(executionContext: ExecutionContext): Promise<boolean> {
        const req = executionContext.switchToHttp().getRequest<Request>();

        const session = await auth.api.getSession({ headers: pickAuthHeaders(req) });

        if (!session) {
            throw new UnauthorizedException('Not authenticated');
        }

        req.user = session.user;

        return true;
    }
}
