import { DBUseCase } from '@application/shared/db.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase {
  constructor(private readonly dbUseCase: DBUseCase) {}

  async exec() {
    return 'Hello World!';
  }
}
