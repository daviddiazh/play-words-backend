import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IWord } from '@word/interfaces/word';

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
export class WordSpec extends Document implements IWord {
  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
  })
  englishWord: string;

  @Prop({
    type: [String],
    required: true,
    trim: true,
  })
  translations: string[];

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  sentence: string;
}

export const WordSchema = SchemaFactory.createForClass(WordSpec);
