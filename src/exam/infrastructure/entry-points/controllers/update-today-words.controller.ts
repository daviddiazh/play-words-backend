import { Body, Controller, Put } from '@nestjs/common';
import { UpdateManyUseCase } from '@exam/application/update-many.use-case';

@Controller('exam')
export class UpdateTodayWordsController {
  constructor(private readonly useCase: UpdateManyUseCase) {}

  @Put('/today/apply')
  async run(@Body() payload: any) {
    return await this.useCase.apply(payload);
  }
}
