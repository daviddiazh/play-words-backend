export interface IWord {
  _id?: string | any;
  englishWord: string;
  translations: string[];
  sentence: string;
  createdAt?: Date;
  updatedAt?: Date;
}
