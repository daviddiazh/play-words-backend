import { Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class FindByWordUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(where: any) {
    return await this.db.findBy(where);
  }
}
