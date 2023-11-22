import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.authService.extractTokenFromHeader(request.headers.authorization);
    if (!token)
      throw new UnauthorizedException({ success: false, message: '비 정상적인 토큰 입니다.' });


    if (request.uuid === undefined) throw new UnauthorizedException({ success: false, message: '비 정상적인 토큰 입니다.' });
    const user = await this.authService.findOneByUUID(request.uuid)
    if (user === null) throw new UnauthorizedException({ success: false, message: '비 정상적인 토큰 입니다.' });
    return true;
  }
}
