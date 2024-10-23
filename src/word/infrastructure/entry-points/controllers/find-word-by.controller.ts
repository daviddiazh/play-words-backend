import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { FindByWordUseCase } from '@word/application/find-by.use-case';
import { FindByDto } from '../dto/find-by-word.dto';
import { AuthenticationGuard } from '@auth/infrastructure/entry-points/guards/auth.guard';
import { RoleGuard } from '@auth/infrastructure/entry-points/guards/role.guard';
import { Role } from '@auth/domain/auth/enums/role';
import { PermitedRoles } from '@auth/infrastructure/entry-points/decorators/role.decorator';

@Controller('words')
export class FindByWordController {
  constructor(private readonly useCase: FindByWordUseCase) {}

  @UseGuards(AuthenticationGuard, RoleGuard)
  @PermitedRoles(Role.ADMIN, Role.READER, Role.WRITER)
  @Get('where')
  run(@Query() query: FindByDto) {
    return this.useCase.apply(query);
  }
}
