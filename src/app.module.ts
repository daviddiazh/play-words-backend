import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@auth/auth.module';
import { ExamModule } from '@exam/exam.module';
import { WordModule } from '@word/word.module';
import { SharedModule } from '@shared/shared.module';
import config from '@shared/infrastructure/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { url } = configService.mongo;

        return { uri: url };
      },
      inject: [config.KEY],
    }),

    AuthModule,
    ExamModule,
    WordModule,
    SharedModule,
  ],
})
export class AppModule {}
