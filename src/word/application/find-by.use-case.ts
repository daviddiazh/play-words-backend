import { BadRequestException, Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class FindByWordUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(where: any) {
    try {
      return await this.db.findBy(where);
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }
}
