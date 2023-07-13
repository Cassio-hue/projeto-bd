import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { CRUD } from '../utils';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class ClassesService {
  CRUD: CRUD;
  table_name = 'class';
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex, this.table_name);
  }

  async create(createClassDto: CreateClassDto) {
    await this.CRUD.create(createClassDto).catch((err) => {
      if (err.code == '23505')
        throw new UnprocessableEntityException(err.detail);
      else throw new BadRequestException('Algo deu errado ao criar turma');
    });
    return 'Turma adicionada com sucesso';
  }

  async findAll() {
    return await this.CRUD.findAll()
      .catch(() => {
        throw Error('Erro ao listar todas as turmas');
      })
      .then((res) => res);
  }

  async findOne(id: number) {
    return await this.CRUD.findOne({ id })
      .catch()
      .then((res) => {
        if (res.length == 0)
          throw new NotFoundException('Id fornecido não foi encontrado');
        return res;
      });
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    await this.checkClassId(id);
    await this.CRUD.update(id, updateClassDto).catch((err) => {
      if (err.code == '23505')
        throw new UnprocessableEntityException(err.detail);
      else
        throw new BadRequestException(
          'Algo deu errado ao atualizar departamento',
        );
    });
  }

  async remove(id: number) {
    await this.checkClassId(id);
    await this.CRUD.delete(id).catch();
    return 'Turma removida com sucesso';
  }

  async classCompleteInfo() {
    return await this.CRUD.findAll('vw_class_details')
      .catch(() => {
        throw Error('Erro ao listar os dados da VIEW vw_class_details');
      })
      .then((res) => res);
  }

  async checkClassId(id: number) {
    const classUnB = await this.findOne(id);
    if (classUnB.length == 0)
      throw new NotFoundException('Id fornecido não foi encontrado');
  }
}
