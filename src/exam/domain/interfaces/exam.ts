export interface IExam {
  _id?: string | any;
  userId: string | any;
  wordId: string | any;
  attempts: number;
  showAt: Date | string;
  lastReview: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}
