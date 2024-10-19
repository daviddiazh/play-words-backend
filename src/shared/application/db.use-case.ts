import { Injectable } from '@nestjs/common';
import { IDBUseCase } from '@shared/domain/db.use-case';

@Injectable()
export class DBUseCase implements IDBUseCase {
  constructor(private readonly db: IDBUseCase) {}

  async find(): Promise<any[]> {
    return await this.db.find();
  }
  async findBy(where: any): Promise<any> {
    return await this.db.findBy(where);
  }
  async create(): Promise<void> {
    await this.db.create();
  }
  async update(): Promise<void> {
    await this.db.update();
  }
}
