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
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';

@Injectable()
export class StudentsService {
  CRUD: CRUD;
  table_name = 'student';
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex, this.table_name);
  }

  async createRating(createRatingDto: CreateRatingDto) {
    const { student_email, class_id, comment, score } = createRatingDto;
    const student_id = await this.getStudentId(student_email);
    // create_rating(student_id, class_id, score, comment)
    await this.knex
      .raw(
        `CALL create_rating(${student_id}, ${class_id}, ${score}, '${comment}')`,
      )
      .catch((err) => {
        throw new BadRequestException(`Erro ao tentar criar avaliação ${err}`);
      });
    return 'Avaliação criada com sucesso';
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
        return res[0];
      });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    await this.checkUserId(id);
    const student_id = await this.getStudentId(id);

    await this.CRUD.update(student_id, updateStudentDto).catch((err) => {
      throw new BadRequestException('Erro ao tentar atualizar estudante', err);
    });
    return 'Estudante atualizado com sucesso';
  }

  async remove(id: string) {
    await this.checkUserId(id);

    const student_id = await this.getStudentId(id);

    await this.CRUD.delete(student_id).catch(() => {
      throw Error('Erro ao tentar remover estudante');
    });
    return 'Estudante removido com sucesso';
  }

  async checkUserId(id: string) {
    const user = await this.findOne({ email: id });
    if (user.length == 0)
      throw new NotFoundException('Id fornecido não foi encontrado');
  }

  async getStudentId(email: string) {
    const student = await this.findOne({ email });
    if (student.length == 0)
      throw new NotFoundException(
        'Id do estudante fornecido não foi encontrado',
      );

    return student.id;
  }
}
