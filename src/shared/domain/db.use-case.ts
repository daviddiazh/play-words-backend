export interface IDBUseCase {
  create: (payload: any) => Promise<void>;
  createMany?: (payload: any[]) => Promise<void>;
  find(): Promise<any[]>;
  findBy?(where: any): Promise<any[] | any>;
  random?(limit: number, userId: string): Promise<any[]>;
  update: (id: any, payload: any) => Promise<void>;
  updateMany?: (payload: any[]) => Promise<void>;
}
