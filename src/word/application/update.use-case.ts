import { BadRequestException, Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class UpdateWordUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(id: any, payload: any) {
    try {
      return await this.db.update(id, payload);
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }
}
