import { Body, Controller, Post } from '@nestjs/common';
import { CreateWordDto } from '../dto/create-word.dto';
import { CreateWordUseCase } from '@word/application/create.use-case';

@Controller('words')
export class CreateWordController {
  constructor(private readonly useCase: CreateWordUseCase) {}

  @Post()
  run(@Body() payload: CreateWordDto) {
    return this.useCase.apply(payload);
  }
}
