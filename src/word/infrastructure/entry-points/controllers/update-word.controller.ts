import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateWordDto } from '../dto/update-word.dto';
import { UpdateWordUseCase } from '../../../application/update.use-case';
import { ParseObjectIdPipe } from '@shared/infrastructure/pipe/parse-object-id';
import { AuthenticationGuard } from '@auth/infrastructure/entry-points/guards/auth.guard';
import { RoleGuard } from '@auth/infrastructure/entry-points/guards/role.guard';
import { PermitedRoles } from '@auth/infrastructure/entry-points/decorators/role.decorator';
import { Role } from '@auth/domain/auth/enums/role';

@Controller('words')
export class UpdateWordController {
  constructor(private readonly useCase: UpdateWordUseCase) {}

  @UseGuards(AuthenticationGuard, RoleGuard)
  @PermitedRoles(Role.ADMIN, Role.WRITER)
  @Put(':id')
  run(@Param('id', ParseObjectIdPipe) id: any, @Body() payload: UpdateWordDto) {
    return this.useCase.apply(id, payload);
  }
}
