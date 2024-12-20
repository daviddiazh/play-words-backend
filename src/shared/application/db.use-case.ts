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
  async random(limit: number, userId: string): Promise<any[]> {
    return await this.db.random(limit, userId);
  }
  async create(payload: any): Promise<void> {
    await this.db.create(payload);
  }
  async createMany(payload: any[]): Promise<void> {
    await this.db.createMany(payload);
  }
  async update(id: any, payload: any): Promise<void> {
    await this.db.update(id, payload);
  }
  async updateMany(payload: any[]): Promise<void> {
    await this.db.updateMany(payload);
  }
}
