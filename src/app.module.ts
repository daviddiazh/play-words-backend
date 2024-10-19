import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { ExamModule } from '@exam/exam.module';
import { WordModule } from '@word/word.module';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [AuthModule, ExamModule, WordModule, SharedModule],
})
export class AppModule {}
