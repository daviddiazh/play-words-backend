import { Role } from '@auth/domain/auth/enums/role';
import { PermitedRoles } from '@auth/infrastructure/entry-points/decorators/role.decorator';
import { AuthenticationGuard } from '@auth/infrastructure/entry-points/guards/auth.guard';
import { RoleGuard } from '@auth/infrastructure/entry-points/guards/role.guard';
import { GetTodayWordsUseCase } from '@exam/application/get-today-words.use-case';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GetTodayWordsDto } from '../dtos/get-today-words.dto';

@Controller('exam')
export class GetTodayWordsController {
  constructor(private readonly useCase: GetTodayWordsUseCase) {}

  @UseGuards(AuthenticationGuard, RoleGuard)
  @PermitedRoles(Role.ADMIN, Role.READER)
  @Post('today')
  async run(@Body() payload: GetTodayWordsDto, @Req() req) {
    const body = {
      ...payload,
      userId: req?.user?._id,
    };
    return await this.useCase.apply(body);
  }
}
