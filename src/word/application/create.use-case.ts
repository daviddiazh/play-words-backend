import { Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class CreateWordUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(payload: any) {
    return await this.db.create(payload);
  }
}
