import { Controller, Get } from '@nestjs/common';
import { FindWordUseCase } from '@word/application/find.use-case';

@Controller('words')
export class FindWordController {
  constructor(private readonly useCase: FindWordUseCase) {}

  @Get()
  run() {
    return this.useCase.apply();
  }
}
