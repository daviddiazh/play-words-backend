import { BadRequestException, Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class GetRandomWordsUseCase {
  constructor(private readonly examDB: DBUseCase) {}

  async apply(limit) {
    try {
      return await this.examDB.random(limit);
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }
}
