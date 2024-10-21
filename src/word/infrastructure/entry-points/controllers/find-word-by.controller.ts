import { Controller, Get, Query } from '@nestjs/common';
import { FindByWordUseCase } from '@word/application/find-by-id.use-case';
import { FindByDto } from '../dto/find-by-word.dto';

@Controller('words')
export class FindByWordController {
  constructor(private readonly useCase: FindByWordUseCase) {}

  @Get('where')
  run(@Query() query: FindByDto) {
    return this.useCase.apply(query);
  }
}
