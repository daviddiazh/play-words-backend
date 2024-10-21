import { Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class UpdateWordUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(id: any, payload: any) {
    return await this.db.update(id, payload);
  }
}
