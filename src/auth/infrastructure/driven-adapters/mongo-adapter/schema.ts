import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '@auth/domain/auth/interfaces/user';
import { Role } from '@auth/domain/auth/enums/role';

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
export class UserSpec extends Document implements IUser {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    enum: [Role.ADMIN, Role.READER, Role.WRITER],
    default: Role.READER,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(UserSpec);
