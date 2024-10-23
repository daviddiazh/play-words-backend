import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateWordDto } from '../dto/create-word.dto';
import { CreateWordUseCase } from '@word/application/create.use-case';
import { PermitedRoles } from '@auth/infrastructure/entry-points/decorators/role.decorator';
import { AuthenticationGuard } from '@auth/infrastructure/entry-points/guards/auth.guard';
import { RoleGuard } from '@auth/infrastructure/entry-points/guards/role.guard';
import { Role } from '@auth/domain/auth/enums/role';

@Controller('words')
export class CreateWordController {
  constructor(private readonly useCase: CreateWordUseCase) {}

  @UseGuards(AuthenticationGuard, RoleGuard)
  @PermitedRoles(Role.ADMIN, Role.WRITER)
  @Post()
  run(@Body() payload: CreateWordDto) {
    return this.useCase.apply(payload);
  }
}
