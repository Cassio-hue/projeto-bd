import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(createClassDto: CreateClassDto) {
    return 'This action adds a new class';
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

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }

  async classCompleteInfo() {
    return await this.CRUD.findAll('vw_class_details')
      .catch(() => {
        throw Error('Erro ao listar os dados da VIEW vw_class_details');
      })
      .then((res) => res);
  }
}
