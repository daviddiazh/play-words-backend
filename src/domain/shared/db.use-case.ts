export interface IDBUseCase {
  find(): Promise<any[]>;
  findBy(where: any): Promise<any>;
  create: () => Promise<void>;
  update: () => Promise<void>;
}
