import { Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class FindWordUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply() {
    return await this.db.find();
  }
}
