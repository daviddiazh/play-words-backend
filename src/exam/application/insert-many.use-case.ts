import { IExam } from '@exam/domain/interfaces/exam';
import { Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class InsertManyUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(payload: IExam[]) {
    return await this.db.createMany(payload);
  }
}
