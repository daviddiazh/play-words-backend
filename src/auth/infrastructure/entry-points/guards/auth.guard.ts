import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseEntity } from '@shared/application/response.entity';
import { VerifyTokenUseCase } from '@auth/application/verify-token.use-case';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly verifyTokenUseCase: VerifyTokenUseCase) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> | any {
    const ctx = context.switchToHttp().getRequest();
    const token = ctx.headers?.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const result = this.verifyTokenUseCase.apply(token);
    if (result.valid) {
      ctx.user = result.decoded;
      return true;
    }

    return new ResponseEntity({
      code: 401,
      description: 'Error de validación',
      title: 'Parece que ya tu sesión se vencío',
    });
  }
}
