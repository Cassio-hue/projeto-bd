import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
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

  async create(createDisciplineDto: CreateDisciplineDto) {
    await this.CRUD.create(createDisciplineDto).catch(() => {
      throw Error('Erro ao criar disciplina');
    });
    return 'Disciplina criada com sucesso';
  }

  async findAll() {
    return await this.CRUD.findAll()
      .catch(() => {
        throw Error('Erro ao listar todas as disciplinas');
      })
      .then((res) => res);
  }

  async findOne(id: string) {
    return await this.CRUD.findOne({ id })
      .catch()
      .then((res) => {
        if (res.length == 0)
          throw new NotFoundException('Id fornecido não foi encontrado');
        return res;
      });
  }

  remove(id: string) {
    return `This action removes a #${id} discipline`;
  }
}
