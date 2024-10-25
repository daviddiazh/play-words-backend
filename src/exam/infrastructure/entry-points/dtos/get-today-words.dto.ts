import { IsNotEmpty, IsString } from 'class-validator';

export class GetTodayWordsDto {
  @IsNotEmpty({
    message: 'La fecha es obligatoria',
  })
  @IsString({
    message: 'La fecha debe ser un texto',
  })
  today: string;
}
