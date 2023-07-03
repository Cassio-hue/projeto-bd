import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
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

  async create(createDepartamentDto: CreateDepartamentDto) {
    await this.CRUD.create(createDepartamentDto).catch((err) => {
      if (err.code == '23505')
        throw new UnprocessableEntityException(err.detail);
      else
        throw new BadRequestException('Algo deu errado ao criar departamento');
    });
    return 'Departamento adicionado com sucesso';
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
