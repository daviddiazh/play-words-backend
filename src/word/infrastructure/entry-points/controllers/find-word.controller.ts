import { Role } from '@auth/domain/auth/enums/role';
import { PermitedRoles } from '@auth/infrastructure/entry-points/decorators/role.decorator';
import { AuthenticationGuard } from '@auth/infrastructure/entry-points/guards/auth.guard';
import { RoleGuard } from '@auth/infrastructure/entry-points/guards/role.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { FindWordUseCase } from '@word/application/find.use-case';

@Controller('words')
export class FindWordController {
  constructor(private readonly useCase: FindWordUseCase) {}

  @UseGuards(AuthenticationGuard, RoleGuard)
  @PermitedRoles(Role.ADMIN, Role.READER, Role.WRITER)
  @Get()
  run() {
    return this.useCase.apply();
  }
}
