import { Body, Controller, Post } from '@nestjs/common';
import { InserManyWordsUseCase } from '@word/application/insert-many.use-case';

@Controller('words')
export class InsertManyController {
  constructor(private readonly useCase: InserManyWordsUseCase) {}

  @Post('massive')
  async run(@Body() payload) {
    await this.useCase.apply(payload?.data);
  }
}
