import { BadRequestException, Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class CreateWordUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(payload: any) {
    try {
      return await this.db.create(payload);
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }
}
