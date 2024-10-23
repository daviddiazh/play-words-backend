import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamSpec } from './schema';
import { IDBUseCase } from '@shared/domain/db.use-case';
import { ResponseEntity } from '@shared/application/response.entity';

@Injectable()
export class ExamMongoDBRepository implements IDBUseCase {
  constructor(@InjectModel('Exam') private examModel: Model<ExamSpec>) {}

  async create(payload: any) {
    try {
      const word: any = this.examModel.findOne({
        userId: payload?.userId,
        wordId: payload?.wordId,
      });

      if (word) {
        return await this.examModel.findByIdAndUpdate(word?._id, payload);
      }

      await new this.examModel(payload).save();

      return payload;
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }

  async find() {
    try {
      return await this.examModel.find().populate('wordId');
    } catch (error) {
      return [];
    }
  }

  async findBy(where: any) {
    try {
      const filter = {};
      if (where.showAt) {
        filter['showAt'] = where.showAt;
      } else if (where.attempts) {
        filter['attempts'] = { attempts: { $gt: where.attempts } };
      } else if (where.lastReview) {
        filter['lastReview'] = where.lastReview;
      }
      return await this.examModel.find(filter).populate('wordId');
    } catch (error) {
      return [];
    }
  }

  async update(payload: any) {
    try {
      return await this.examModel.findByIdAndUpdate<any>(payload?._id, payload);
      // return await this.examModel.updateMany<any>(payload?._id, payload);
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }
}
