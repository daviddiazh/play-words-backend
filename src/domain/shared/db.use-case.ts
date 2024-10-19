export interface IDBUseCase {
  find<T>(): Promise<T[]>;
  findBy<T>(where: T): Promise<T>;
  create: () => Promise<void>;
  update: () => Promise<void>;
}
