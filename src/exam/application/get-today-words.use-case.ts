import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { IGetTodayWords } from '@exam/domain/interfaces/get-today-words';
import { DBUseCase } from '@shared/application/db.use-case';
import { GetRandomWordsUseCase } from '@word/application/get-random-words';
import { InsertManyUseCase } from './insert-many.use-case';

@Injectable()
export class GetTodayWordsUseCase {
  constructor(
    private readonly examDB: DBUseCase,
    private readonly getRandomUseCase: GetRandomWordsUseCase,
    private readonly insertManyUseCase: InsertManyUseCase,
  ) {}

  async apply(payload: IGetTodayWords) {
    try {
      const isLastReviewToday = await this.examDB.findBy({
        lastReview: payload?.today,
        userId: payload?.userId,
      });
      if (isLastReviewToday?.length) {
        return [];
      }

      const todayWords = await this.examDB.findBy({
        showAt: payload?.today,
        userId: payload?.userId,
      });
      const wordsByAttempts = await this.examDB.findBy({
        attempts: 3,
        userId: payload?.userId,
      });

      const words = [...todayWords, ...wordsByAttempts];

      if (todayWords.length <= 30) {
        const randomWords = await this.getRandomUseCase.apply(
          25,
          payload?.userId,
        );
        const mapped = randomWords?.map((word) => ({
          wordId: word?._id,
          userId: new mongoose.Types.ObjectId(payload?.userId),
          attempts: 0,
          showAt: payload?.today,
          lastReview: undefined,
        }));
        await this.insertManyUseCase.apply(mapped);
        return [...words, randomWords].flatMap((i) => i);
      }

      return words;
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }
}
