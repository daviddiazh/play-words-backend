import { BadRequestException, Injectable } from '@nestjs/common';
import { DBUseCase } from '@shared/application/db.use-case';
import { GetRandomWordsUseCase } from '@word/application/get-random-words';

@Injectable()
export class GetTodayWordsUseCase {
  constructor(
    private readonly examDB: DBUseCase,
    private readonly getRandomUseCase: GetRandomWordsUseCase,
  ) {}

  async apply(payload) {
    try {
      const todayWords = await this.examDB.findBy({ showAt: payload?.today });
      const wordsByAttempts = await this.examDB.findBy({ attempts: 2 });

      const words = [...todayWords, ...wordsByAttempts];

      if (todayWords.length <= 10) {
        const randomWords = await this.getRandomUseCase.apply(10);
        words.filter((word) => {
          return !randomWords.some((random) => {
            return (
              random?.userId == word?.userId && random?.wordId == word?.wordId
            );
          });
        });
      }
      return words;
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }
}
