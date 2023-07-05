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
  table_name = 'student';
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex, this.table_name);
  }

  async create(createStudentDto: CreateStudentDto) {
    await this.CRUD.create(createStudentDto).catch((err) => {
      if (err.code == '23505')
        throw new UnprocessableEntityException(err.detail);
      else throw new BadRequestException('Erro ao tentar criar estudante');
    });
    return 'Estudante adicionado com sucesso';
  }

  async findAll() {
    return await this.CRUD.findAll()
      .catch(() => {
        throw Error('Erro ao buscar todos os estudantes');
      })
      .then((res) => res);
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
      throw new BadRequestException('Erro ao tentar atualizar estudante', err);
    });
    return 'Estudante atualizado com sucesso';
  }

  async remove(id: number) {
    await this.checkUserId(id);
    await this.CRUD.delete(id).catch(() => {
      throw Error('Erro ao tentar remover estudante');
    });
    return 'Estudante removido com sucesso';
  }

  private async checkUserId(id: number) {
    const user = await this.findOne({ id });
    if (user.length == 0)
      throw new NotFoundException('Id fornecido não foi encontrado');
  }
}
