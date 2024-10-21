import { IWord } from '@word/interfaces/word';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateWordDto implements IWord {
  @IsNotEmpty({
    message: 'La palabra en ingles es obligatoria',
  })
  @IsString({
    message: 'La palabra en ingles debe ser un texto',
  })
  englishWord: string;

  @IsNotEmpty({
    message: 'Las traducciones son obligatorias',
  })
  @IsArray({
    message: 'Las traducciones deben ser una lista de palabras',
  })
  translations: string[];

  @IsNotEmpty({
    message: 'La frase es obligatoria',
  })
  @IsString({
    message: 'La frase debe ser un texto',
  })
  sentence: string;
}
