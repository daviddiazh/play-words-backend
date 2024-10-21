import { IWord } from '@word/interfaces/word';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateWordDto implements IWord {
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

  @IsOptional()
  @IsString({
    message: 'La frase debe ser un texto',
  })
  sentence: string;
}
