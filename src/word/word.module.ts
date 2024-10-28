import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordSchema } from './infrastructure/driven-adapters/mongo-adapter/schema';
import { WordMongoDBRepository } from './infrastructure/driven-adapters/mongo-adapter/repository';
import { DBUseCase } from '@shared/application/db.use-case';
import { CreateWordUseCase } from './application/create.use-case';
import { UpdateWordUseCase } from './application/update.use-case';
import { FindByWordUseCase } from './application/find-by.use-case';
import { FindWordUseCase } from './application/find.use-case';
import { CreateWordController } from './infrastructure/entry-points/controllers/create-word.controller';
import { UpdateWordController } from './infrastructure/entry-points/controllers/update-word.controller';
import { FindByWordController } from './infrastructure/entry-points/controllers/find-word-by.controller';
import { FindWordController } from './infrastructure/entry-points/controllers/find-word.controller';
import { AuthModule } from '@auth/auth.module';
import { GetRandomWordsUseCase } from './application/get-random-words';
import { InserManyWordsUseCase } from './application/insert-many.use-case';
import { InsertManyController } from './infrastructure/entry-points/controllers/create-many.controller';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Word', schema: WordSchema }]),
  ],
  providers: [
    WordMongoDBRepository,

    {
      inject: [WordMongoDBRepository],
      provide: CreateWordUseCase,
      useFactory: (dbAdapter: DBUseCase) => new CreateWordUseCase(dbAdapter),
    },
    {
      inject: [WordMongoDBRepository],
      provide: UpdateWordUseCase,
      useFactory: (dbAdapter: DBUseCase) => new UpdateWordUseCase(dbAdapter),
    },
    {
      inject: [WordMongoDBRepository],
      provide: FindByWordUseCase,
      useFactory: (dbAdapter: DBUseCase) => new FindByWordUseCase(dbAdapter),
    },
    {
      inject: [WordMongoDBRepository],
      provide: FindWordUseCase,
      useFactory: (dbAdapter: DBUseCase) => new FindWordUseCase(dbAdapter),
    },
    {
      inject: [WordMongoDBRepository],
      provide: GetRandomWordsUseCase,
      useFactory: (dbAdapter: DBUseCase) =>
        new GetRandomWordsUseCase(dbAdapter),
    },
    {
      inject: [WordMongoDBRepository],
      provide: InserManyWordsUseCase,
      useFactory: (dbAdapter: DBUseCase) =>
        new InserManyWordsUseCase(dbAdapter),
    },
  ],
  controllers: [
    CreateWordController,
    UpdateWordController,
    FindByWordController,
    FindWordController,
    InsertManyController,
  ],
  exports: [GetRandomWordsUseCase],
})
export class WordModule {}
