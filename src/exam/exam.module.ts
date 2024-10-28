import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamSchema } from './infrastructure/driven-adapters/mongo-adapter/schema';
import { ExamMongoDBRepository } from './infrastructure/driven-adapters/mongo-adapter/repository';
import { GetTodayWordsUseCase } from './application/get-today-words.use-case';
import { DBUseCase } from '@shared/application/db.use-case';
import { WordModule } from '@word/word.module';
import { GetRandomWordsUseCase } from '@word/application/get-random-words';
import { GetTodayWordsController } from './infrastructure/entry-points/controllers/get-today-words.controller';
import { InsertManyUseCase } from './application/insert-many.use-case';
import { UpdateManyUseCase } from './application/update-many.use-case';
import { UpdateTodayWordsController } from './infrastructure/entry-points/controllers/update-today-words.controller';

@Module({
  imports: [
    AuthModule,
    WordModule,
    MongooseModule.forFeature([{ name: 'Exam', schema: ExamSchema }]),
  ],
  providers: [
    ExamMongoDBRepository,

    {
      inject: [ExamMongoDBRepository],
      provide: InsertManyUseCase,
      useFactory: (dbAdapter: DBUseCase) => new InsertManyUseCase(dbAdapter),
    },
    {
      inject: [ExamMongoDBRepository],
      provide: UpdateManyUseCase,
      useFactory: (dbAdapter: DBUseCase) => new UpdateManyUseCase(dbAdapter),
    },
    {
      inject: [ExamMongoDBRepository, GetRandomWordsUseCase, InsertManyUseCase],
      provide: GetTodayWordsUseCase,
      useFactory: (
        dbAdapter: DBUseCase,
        getRandomUseCase: GetRandomWordsUseCase,
        insertManyUseCase: InsertManyUseCase,
      ) =>
        new GetTodayWordsUseCase(
          dbAdapter,
          getRandomUseCase,
          insertManyUseCase,
        ),
    },
  ],
  controllers: [GetTodayWordsController, UpdateTodayWordsController],
  exports: [],
})
export class ExamModule {}
