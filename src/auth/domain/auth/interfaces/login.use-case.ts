import { IResponseEntity } from '@shared/domain/response.entity';
import { IUser } from './user';

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface ILoginUseCase {
  apply(payload: IUser): Promise<ILoginResponse | IResponseEntity>;
}
