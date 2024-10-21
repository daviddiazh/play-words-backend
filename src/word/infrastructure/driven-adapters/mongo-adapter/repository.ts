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

    try {
      const user = await this.wordModel.findOne(where);

      if (user) {
        return user?.['_doc'];
      }

      return user;
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
