import { IResponseEntity } from '@shared/domain/response.entity';
import { IUser } from './user';

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface ILoginUseCase {
  exec(payload: IUser): Promise<ILoginResponse | IResponseEntity>;
}
