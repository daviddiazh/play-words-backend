import { Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';
import { ResponseEntity } from '@shared/application/response.entity';
import {
  ILoginResponse,
  ILoginUseCase,
} from '@auth/domain/auth/interfaces/login.use-case';
import { IUser } from '@auth/domain/auth/interfaces/user';
import { IResponseEntity } from '@shared/domain/response.entity';

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly db: DBUseCase,
    private readonly hash,
    private readonly jwtService,
  ) {}

  async exec(payload: IUser): Promise<ILoginResponse | IResponseEntity> {
    const responseEntity = new ResponseEntity({
      code: 400,
      title: 'Error al iniciar sesión',
      description: 'Revisa los datos por favor',
    });

    try {
      const { email, password: passwordReq } = payload;

      const user: IUser = await this.db.findBy({ email: email.toLowerCase() });

      if (!user) return responseEntity;

      const isMatchPasswords = await this.hash.compare(
        passwordReq,
        user?.password,
      );

      if (!isMatchPasswords) {
        return responseEntity;
      }

      delete user.password;

      return {
        user,
        token: this.jwtService.sign({ _id: user?._id + '' }),
      };
    } catch (error) {
      console.error('Error al loguearse, ' + error);
      return responseEntity;
    }
  }
}
