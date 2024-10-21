import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '@auth/application/login.use-case';
import { CreateWordDto } from '../dto/create-word.dto';

@Controller('words')
export class CreateWordController {
  constructor(private readonly useCase: LoginUseCase) {}

  @Post('login')
  run(@Body() payload: CreateWordDto) {
    return this.useCase.apply(payload);
  }
}
