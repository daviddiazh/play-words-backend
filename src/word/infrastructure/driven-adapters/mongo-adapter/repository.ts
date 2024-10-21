import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDBUseCase } from '@shared/domain/db.use-case';
import { ResponseEntity } from '@shared/application/response.entity';
import { WordSpec } from './schema';

@Injectable()
export class WordMongoDBRepository implements IDBUseCase {
  constructor(@InjectModel('Word') private wordModel: Model<WordSpec>) {}

  async create(payload: any) {
    const responseEntity = new ResponseEntity({
      code: 400,
      title: 'Error al guardar la palabra',
      description: 'Por favor verifique los datos e ingréselos nuevamente',
    });

    try {
      const word: any = await this.findBy({ englishWord: payload.englishWord });

      if (word.length > 0) {
        return new ResponseEntity({
          code: 400,
          title: 'Error al guardar la palabra',
          description: 'La palabra que intentas guardar ya existe',
        });
      }

      await new this.wordModel(payload).save();

      return payload;
    } catch (error) {
      return responseEntity;
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
    const responseEntity = new ResponseEntity({
      code: 404,
      title: 'Error en el filtro',
      description: 'No se encontró ningúna palabra con el filtro ingresado',
    });

    const filter = {};
    if (where?.englishWord) {
      filter['englishWord'] = { $regex: where.englishWord, $options: 'i' };
    } else if (where?.translations) {
      filter['translations'] = { $regex: where.translations, $options: 'i' };
    } else if (where?.englishWord && where?.translations) {
      filter['englishWord'] = { $regex: where.englishWord, $options: 'i' };
      filter['translations'] = { $regex: where.translations, $options: 'i' };
    } else {
      return [];
    }

    try {
      const words = await this.wordModel.find(filter);

      return words;
    } catch (error) {
      return responseEntity;
    }
  }

  async update(payload: any) {
    const responseEntity = new ResponseEntity({
      code: 400,
      title: 'Error al actualizar la palabra',
      description:
        'Error en la actualización, por favor verifique los datos e ingréselos nuevamente',
    });
    try {
      return await this.wordModel.findByIdAndUpdate<any>(payload?._id, payload);
    } catch (error) {
      return responseEntity;
    }
  }
}
