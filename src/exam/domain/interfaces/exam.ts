export interface IExam {
  _id?: string | any;
  userId: string | any;
  wordId: string | any;
  attempts: number;
  showAt: Date;
  lastReview: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
