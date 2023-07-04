import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateDepartamentDto } from './dto/create-departments.dto';
import { UpdateDepartamentDto } from './dto/update-department.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CRUD } from '../utils';

@Injectable()
export class DepartmentsService {
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

  async findOne(id: number) {
    return await this.CRUD.findOne({ id })
      .catch()
      .then((res) => {
        if (res.length == 0)
          throw new NotFoundException('Id fornecido não foi encontrado');
        return res;
      });
  }

  async update(id: number, updateDepartamentDto: UpdateDepartamentDto) {
    await this.checkDepartmentId(id);
    await this.CRUD.update(id, updateDepartamentDto).catch((err) => {
      if (err.code == '23505')
        throw new UnprocessableEntityException(err.detail);
      else
        throw new BadRequestException(
          'Algo deu errado ao atualizar departamento',
        );
    });
    return 'Departamento atualizado com sucesso';
  }

  async remove(id: number) {
    await this.checkDepartmentId(id);
    await this.CRUD.delete(id).catch();
    return 'Departamento removido com sucesso';
  }

  private async checkDepartmentId(id: number) {
    const department = await this.findOne(id);
    if (department.length == 0)
      throw new NotFoundException('Id fornecido não foi encontrado');
  }
}
