export interface IDBUseCase {
  create: (payload: any) => Promise<void>;
  find(): Promise<any[]>;
  findBy(where: any): Promise<any>;
  update: (payload: any) => Promise<void>;
}
