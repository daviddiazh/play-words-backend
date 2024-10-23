import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamSchema } from './infrastructure/driven-adapters/mongo-adapter/schema';
import { ExamMongoDBRepository } from './infrastructure/driven-adapters/mongo-adapter/repository';
import { GetTodayWordsUseCase } from './application/get-today-words.use-case';
import { DBUseCase } from '@shared/application/db.use-case';
import { WordModule } from '@word/word.module';
import { GetRandomWordsUseCase } from '@word/application/get-random-words';

@Module({
  imports: [
    AuthModule,
    WordModule,
    MongooseModule.forFeature([{ name: 'Exam', schema: ExamSchema }]),
  ],
  providers: [
    ExamMongoDBRepository,

    {
      inject: [ExamMongoDBRepository, GetRandomWordsUseCase],
      provide: GetTodayWordsUseCase,
      useFactory: (
        dbAdapter: DBUseCase,
        getRandomUseCase: GetRandomWordsUseCase,
      ) => new GetTodayWordsUseCase(dbAdapter, getRandomUseCase),
    },
  ],
  controllers: [],
  exports: [],
})
export class ExamModule {}
