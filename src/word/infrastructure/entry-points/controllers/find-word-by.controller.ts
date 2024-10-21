import { Body, Controller, Get } from '@nestjs/common';
import { FindByWordUseCase } from '@word/application/find-by-id.use-case';
import { UpdateWordDto } from '../dto/update-word.dto';

@Controller('words')
export class FindByWordController {
  constructor(private readonly useCase: FindByWordUseCase) {}

  @Get()
  run(@Body() payload: UpdateWordDto) {
    return this.useCase.apply(payload);
  }
}
