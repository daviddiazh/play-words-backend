import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordSchema } from './infrastructure/driven-adapters/mongo-adapter/schema';
import { WordMongoDBRepository } from './infrastructure/driven-adapters/mongo-adapter/repository';
import { DBUseCase } from '@shared/application/db.use-case';
import { CreateWordUseCase } from './application/create.use-case';
import { UpdateWordUseCase } from './application/update.use-case';
import { FindByWordUseCase } from './application/find-by-id.use-case';
import { FindWordUseCase } from './application/find.use-case';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Word', schema: WordSchema }])],
  providers: [
    WordMongoDBRepository,

    {
      inject: [WordMongoDBRepository],
      provide: CreateWordUseCase,
      useFactory: (dbAdapter: DBUseCase) => {
        new CreateWordUseCase(dbAdapter);
      },
    },
    {
      inject: [WordMongoDBRepository],
      provide: UpdateWordUseCase,
      useFactory: (dbAdapter: DBUseCase) => {
        new UpdateWordUseCase(dbAdapter);
      },
    },
    {
      inject: [WordMongoDBRepository],
      provide: FindByWordUseCase,
      useFactory: (dbAdapter: DBUseCase) => {
        new FindByWordUseCase(dbAdapter);
      },
    },
    {
      inject: [WordMongoDBRepository],
      provide: FindWordUseCase,
      useFactory: (dbAdapter: DBUseCase) => {
        new FindWordUseCase(dbAdapter);
      },
    },
  ],
  controllers: [],
})
export class WordModule {}
