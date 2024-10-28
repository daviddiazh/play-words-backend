import { Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';
import { IWord } from '@word/interfaces/word';

@Injectable()
export class InserManyWordsUseCase {
  constructor(private readonly db: DBUseCase) {}

  async apply(payload: IWord[]) {
    return await this.db.createMany(payload);
  }
}
