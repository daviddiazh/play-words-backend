import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashUseCase } from './hash.use-case';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class EnrollmentUseCase {
  constructor(
    private readonly hashUseCase: HashUseCase,
    private readonly dbUseCase: DBUseCase,
  ) {}

  async apply(payload: any) {
    try {
      const user = await this.dbUseCase.findBy({
        email: payload.email.toLowerCase(),
      });

      if (user) throw new UnauthorizedException('Verifica los datos por favor');

      const passwordEncrypted = await this.hashUseCase.hash(payload.password);

      await this.dbUseCase.create({
        ...payload,
        email: payload.email.toLowerCase(),
        password: passwordEncrypted,
      });

      return {
        enrolled: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
