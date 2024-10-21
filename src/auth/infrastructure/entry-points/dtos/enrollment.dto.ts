import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IUser } from '@auth/domain/auth/interfaces/user';
import { Role } from '@auth/domain/auth/enums/role';

export class EnrollmentDto implements IUser {
  @IsNotEmpty({
    message: 'El nombre es obligatorio',
  })
  @IsString({
    message: 'El nombre debe ser un texto',
  })
  name: string;

  @IsNotEmpty({
    message: 'El correo electrónico es obligatorio',
  })
  @IsString({
    message: 'El correo electrónico debe ser un texto',
  })
  email: string;

  @IsNotEmpty({
    message: 'La contraseña es obligatoria',
  })
  @IsString({
    message: 'La contraseña debe ser un texto',
  })
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
  })
  password: string;

  @IsNotEmpty({
    message: 'El rol es obligatorio',
  })
  @IsIn([Role.ADMIN, Role.READER, Role.WRITER], {
    message: 'El rol no es válido',
  })
  role: Role;
}
