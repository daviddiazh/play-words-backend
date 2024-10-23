import { IExam } from '@exam/domain/interfaces/exam';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
  versionKey: false,
})
export class ExamSpec extends Document implements IExam {
  @Prop({
    type: Types.ObjectId,
    required: true,
    trim: true,
  })
  userId: any;

  @Prop({
    type: Types.ObjectId,
    required: true,
    trim: true,
    ref: 'Word',
  })
  wordId: any;

  @Prop({
    type: Number,
    required: true,
    trim: true,
    default: 0,
  })
  attempts: number;

  @Prop({
    type: Date,
    required: true,
    trim: true,
  })
  showAt: Date;

  @Prop({
    type: Date,
    required: false,
    trim: true,
    default: undefined,
  })
  lastReview: Date;
}

export const ExamSchema = SchemaFactory.createForClass(ExamSpec);
