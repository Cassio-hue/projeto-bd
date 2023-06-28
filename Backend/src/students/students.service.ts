import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CRUD } from '../utils/crud_sql';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class StudentsService {
  CRUD: CRUD;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex);
  }

  async create(createStudentDto: CreateStudentDto) {
    await this.CRUD.create('student', createStudentDto).catch((err) => {
      if (err.code == '23505')
        throw new UnprocessableEntityException(err.detail);
      else throw new BadRequestException('Algo deu errado ao criar estudante');
    });
    return 'Estudante adicionado com sucesso';
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
