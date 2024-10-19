import { IUser } from './user';
import { IResponseEntity } from '@domain/shared/response.entity';

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface ILoginUseCase {
  exec(payload: IUser): Promise<ILoginResponse | IResponseEntity>;
}
