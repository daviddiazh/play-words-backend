import { IsArray, IsOptional, IsString } from 'class-validator';

export class FindByDto {
  @IsOptional()
  @IsString({
    message: 'La palabra en ingles debe ser un texto',
  })
  englishWord: string;

  @IsOptional()
  @IsArray({
    message: 'Las traducciones deben ser una lista de palabras',
  })
  translations: string[];
}
