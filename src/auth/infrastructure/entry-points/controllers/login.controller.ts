import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginUseCase } from '@auth/application/login.use-case';

@Controller('auth')
export class LoginController {
  constructor(private readonly useCase: LoginUseCase) {}

  @Post('login')
  run(@Body() payload: LoginDto) {
    return this.useCase.apply(payload);
  }
}
