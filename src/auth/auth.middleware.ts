import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalsDto } from './dto/Locals.dto';
import { Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService
  ) { }

  async use(req: Request & LocalsDto, _: any, next: () => void): Promise<void> {
    const token = req.headers.authorization

    if (token) {
      const session = await this.authService.verifyToken(token)

      if (session !== null) {
        req.uuid = session.payload.uuid
      }
    }
    next();
  }
}
