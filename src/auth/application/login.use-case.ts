import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';
import { ResponseEntity } from '@shared/application/response.entity';
import {
  ILoginResponse,
  ILoginUseCase,
} from '@auth/domain/auth/interfaces/login.use-case';
import { IUser } from '@auth/domain/auth/interfaces/user';
import { IResponseEntity } from '@shared/domain/response.entity';
import { HashUseCase } from './hash.use-case';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly db: DBUseCase,
    private readonly hash: HashUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async apply(payload: any): Promise<ILoginResponse | IResponseEntity> {
    const responseEntity = new ResponseEntity({
      code: 401,
      title: 'Error al iniciar sesión',
      description: 'Revisa los datos por favor',
    });

    try {
      const { email, password: passwordReq } = payload;

      const user: IUser = await this.db.findBy({ email: email.toLowerCase() });

      // if (!user) return responseEntity;
      if (!user) throw new UnauthorizedException(responseEntity);

      const isMatchPasswords = await this.hash.compare(
        passwordReq,
        user?.password,
      );

      if (!isMatchPasswords) throw new UnauthorizedException(responseEntity);

      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;

      return {
        user,
        token: this.jwtService.sign(
          { _id: user?._id + '', role: user?.role },
          { privateKey: process.env.JWT_SECRET },
        ),
      };
    } catch (error) {
      throw new UnauthorizedException(responseEntity);
    }
  }
}
