import { IExam } from '@exam/domain/interfaces/exam';
import { Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';

@Injectable()
export class UpdateManyUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(payload: IExam[]) {
    return await this.db.updateMany(payload);
  }
}
