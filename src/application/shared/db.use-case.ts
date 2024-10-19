import { Injectable } from '@nestjs/common';
import { IDBUseCase } from '@domain/shared/db.use-case';

@Injectable()
export class DBUseCase implements IDBUseCase {
  constructor(private readonly db: IDBUseCase) {}

  async find<IUser>(): Promise<IUser[]> {
    return await this.db.find();
  }
  async findBy<IUser>(where: IUser): Promise<IUser> {
    return await this.db.findBy(where);
  }
  async create(): Promise<void> {
    await this.db.create();
  }
  async update(): Promise<void> {
    await this.db.update();
  }
}
