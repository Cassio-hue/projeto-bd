import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CRUD } from '../utils/crud_sql';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class StudentsService {
  CRUD: CRUD;
  table_name = 'Student';
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex, this.table_name);
  }

  async create(createStudentDto: CreateStudentDto) {
    await this.CRUD.create(createStudentDto).catch((err) => {
      if (err.code == '23505')
        throw new UnprocessableEntityException(err.detail);
      else throw new BadRequestException('Algo deu errado ao criar estudante');
    });
    return 'Estudante adicionado com sucesso';
  }

  async findAll() {
    const response = await this.CRUD.findAll(this.table_name).catch();
    return response;
  }

  async findOne({ id, email }: { id?: number; email?: string }) {
    if (!id && !email)
      throw new BadRequestException('É necessário fornecer um email ou id');
    return await this.CRUD.findOne({ id, email })
      .catch()
      .then((res) => {
        if (res.length == 0)
          throw new NotFoundException('Id fornecido não foi encontrado');
        return res;
      });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    await this.checkUserId(id);
    await this.CRUD.update(id, updateStudentDto).catch((err) => {
      throw new BadRequestException(
        'Algo deu errado ao atualizar estudante',
        err,
      );
    });
    return 'Estudante atualizado com sucesso';
  }

  async remove(id: number) {
    await this.checkUserId(id);
    await this.CRUD.delete(id).catch();
    return 'Estudante removido com sucesso';
  }

  private async checkUserId(id: number) {
    const user = await this.findOne({ id });
    if (user.length == 0)
      throw new NotFoundException('Id fornecido não foi encontrado');
  }
}
