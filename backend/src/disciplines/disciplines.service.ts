import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { CRUD } from '../utils';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class DisciplinesService {
  CRUD: CRUD;
  table_name = 'discipline';
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex, this.table_name);
  }

  create(createDisciplineDto: CreateDisciplineDto) {
    return 'This action adds a new discipline';
  }

  async findAll() {
    return await this.CRUD.findAll()
      .catch(() => {
        throw Error('Erro ao listar todas as disciplinas');
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

  update(id: number, updateDisciplineDto: UpdateDisciplineDto) {
    return `This action updates a #${id} discipline`;
  }

  remove(id: number) {
    return `This action removes a #${id} discipline`;
  }
}
