import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSpec } from './schema';
import { IDBUseCase } from '@shared/domain/db.use-case';

@Injectable()
export class UserMongoDBRepository implements IDBUseCase {
  constructor(@InjectModel('User') private userModel: Model<UserSpec>) {}

  async create(payload: any) {
    try {
      await new this.userModel(payload).save();

      return payload;
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }

  async find() {
    try {
      return await this.userModel.find();
    } catch (error) {
      return [];
    }
  }

  async findBy(where: any) {
    try {
      const user = await this.userModel.findOne(where);

      if (user) {
        return user?.['_doc'];
      }

      return user;
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }

  async update(payload: any) {
    try {
      return await this.userModel.findByIdAndUpdate<any>(payload?._id, payload);
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }
}
