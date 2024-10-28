import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ExamSpec } from './schema';
import { IDBUseCase } from '@shared/domain/db.use-case';

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

  async createMany(payload: any[]) {
    try {
      await this.examModel.insertMany(payload, { ordered: false });
    } catch (error) {
      throw new BadRequestException('Error al guardar los exámen del día');
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
      const filter = { userId: new Types.ObjectId(where?.userId) };
      if (where.showAt) {
        filter['showAt'] = {
          $lte: where.showAt,
        };
      } else if (where.attempts) {
        filter['attempts'] = {
          $gte: where.attempts,
        };
      } else if (where.lastReview) {
        filter['lastReview'] = {
          $lte: where.lastReview,
        };
      }

      const data = await this.examModel.find(filter).populate('wordId');
      const resp = data?.map((d) => ({
        _id: d?.wordId?._id,
        englishWord: d?.wordId?.englishWord,
        translations: d?.wordId?.translations,
        sentence: d?.wordId?.sentence,
        attempts: d?.attempts,
      }));
      return resp;
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

  async updateMany(payload: any[]) {
    try {
      const bulkOps = payload.map((update) => ({
        updateOne: {
          filter: {
            wordId: new Types.ObjectId(update?.wordId),
            userId: new Types.ObjectId(update?.userId),
          },
          update: { $set: update?.newValues },
        },
      }));

      await this.examModel.bulkWrite(bulkOps);

      return {
        ok: true,
      };
    } catch (error) {
      throw new BadRequestException(
        'Error al guardar las respuestas del exámen del día',
      );
    }
  }
}
