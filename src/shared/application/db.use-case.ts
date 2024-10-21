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
  async create(payload: any): Promise<void> {
    await this.db.create(payload);
  }
  async update(payload: any): Promise<void> {
    await this.db.update(payload);
  }
}
