import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IDBUseCase } from '@shared/domain/db.use-case';
import { WordSpec } from './schema';

@Injectable()
export class WordMongoDBRepository implements IDBUseCase {
  constructor(@InjectModel('Word') private wordModel: Model<WordSpec>) {}

  async create(payload: any) {
    try {
      const word: any = await this.wordModel.findOne({
        englishWord: payload.englishWord,
      });

      if (word) {
        throw new BadRequestException('Verifica los datos por favor');
      }

      await new this.wordModel(payload).save();

      return payload;
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }

  async find() {
    try {
      return await this.wordModel.find();
    } catch (error) {
      return [];
    }
  }

  async findBy(where: any) {
    const filter = {};
    if (where?.englishWord) {
      filter['englishWord'] = {
        $regex: where.englishWord.trim(),
        $options: 'i',
      };
    } else if (where?.translations) {
      filter['translations'] = {
        $regex: where.translations.trim(),
        $options: 'i',
      };
    } else if (where?.englishWord && where?.translations.trim()) {
      filter['englishWord'] = {
        $regex: where.englishWord.trim(),
        $options: 'i',
      };
      filter['translations'] = {
        $regex: where.translations.trim(),
        $options: 'i',
      };
    } else {
      return {};
    }

    try {
      const words = await this.wordModel.find(filter);

      return words;
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }

  async update(payload: any) {
    try {
      return await this.wordModel.findByIdAndUpdate<any>(payload?._id, payload);
    } catch (error) {
      throw new BadRequestException('Verifica los datos por favor');
    }
  }

  async random(limit: number, userId: string) {
    try {
      const newWords = await this.wordModel.aggregate([
        {
          $lookup: {
            from: 'exams',
            let: { wordId: '$_id', userId: new Types.ObjectId(userId) },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$wordId', '$$wordId'] },
                      { $eq: ['$userId', '$$userId'] },
                    ],
                  },
                },
              },
            ],
            as: 'matchingExams',
          },
        },
        {
          $match: {
            $expr: { $eq: [{ $size: '$matchingExams' }, 0] },
          },
        },
        {
          $project: { _id: 1, englishWord: 1, translations: 1, sentence: 1 },
        },
        {
          $limit: limit,
        },
      ]);

      return newWords;
    } catch (error) {
      return [];
    }
  }
}
