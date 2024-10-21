import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSpec } from './schema';
import { IDBUseCase } from '@shared/domain/db.use-case';
import { ResponseEntity } from '@shared/application/response.entity';

@Injectable()
export class UserMongoDBRepository implements IDBUseCase {
  constructor(@InjectModel('User') private userModel: Model<UserSpec>) {}

  async create(payload: any) {
    const responseEntity = new ResponseEntity({
      code: 400,
      title: 'Error en el registro',
      description:
        'Error en el registro, por favor verifique los datos e ingréselos nuevamente',
    });

    try {
      await new this.userModel(payload).save();

      return payload;
    } catch (error) {
      return responseEntity;
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
    const responseEntity = new ResponseEntity({
      code: 404,
      title: 'Error en el filtro',
      description: 'No se encontró ningún usuario',
    });

    try {
      const user = await this.userModel.findOne(where);

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
      title: 'Error al actualizar el usuario',
      description:
        'Error en la actualización, por favor verifique los datos e ingréselos nuevamente',
    });
    try {
      return await this.userModel.findByIdAndUpdate<any>(payload?._id, {
        role: payload?.role,
      });
    } catch (error) {
      return responseEntity;
    }
  }
}
