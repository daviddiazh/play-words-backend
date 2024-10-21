import { EnrollmentUseCase } from '@auth/application/enrollment.use-case';
import { Body, Controller, Post } from '@nestjs/common';
import { EnrollmentDto } from '../dtos/enrollment.dto';

@Controller('auth')
export class EnrollmentController {
  constructor(private readonly useCase: EnrollmentUseCase) {}

  @Post('enrollment')
  run(@Body() payload: EnrollmentDto) {
    return this.useCase.apply(payload);
  }
}
