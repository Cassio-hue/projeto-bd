import { Injectable } from '@nestjs/common';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CRUD } from '../utils';

@Injectable()
export class DepartamentsService {
  CRUD: CRUD;
  table_name = 'Department';
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex, this.table_name);
  }

  create(createDepartamentDto: CreateDepartamentDto) {
    return 'This action adds a new departament';
  }

  async findAll() {
    const response = await this.CRUD.findAll(this.table_name).catch();
    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} departament`;
  }

  update(id: number, updateDepartamentDto: UpdateDepartamentDto) {
    return `This action updates a #${id} departament`;
  }

  remove(id: number) {
    return `This action removes a #${id} departament`;
  }
}
