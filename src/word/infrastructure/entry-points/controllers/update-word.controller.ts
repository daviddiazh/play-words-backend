import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateWordDto } from '../dto/update-word.dto';
import { UpdateWordUseCase } from '../../../application/update.use-case';
import { ParseObjectIdPipe } from '@shared/infrastructure/pipe/parse-object-id';

@Controller('words')
export class UpdateWordController {
  constructor(private readonly useCase: UpdateWordUseCase) {}

  @Put(':id')
  run(@Param('id', ParseObjectIdPipe) id: any, @Body() payload: UpdateWordDto) {
    return this.useCase.apply(id, payload);
  }
}
