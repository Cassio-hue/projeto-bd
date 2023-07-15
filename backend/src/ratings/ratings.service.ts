import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CRUD } from '../utils';
import { StudentsService } from '../students/students.service';
import { ClassesService } from '../classes/classes.service';

@Injectable()
export class RatingsService {
  CRUD: CRUD;
  table_name = 'rating';
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private studentService: StudentsService,
    private classService: ClassesService,
  ) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex, this.table_name);
  }

  async create(createRatingDto: CreateRatingDto) {
    const { student_email, ...createRatingData } = createRatingDto;
    const student_id = await this.getStudentId(student_email);
    const data = {
      student_id: student_id,
      ...createRatingData,
    };
    await this.CRUD.create(data).catch((err) => {
      throw new BadRequestException(
        `Algo deu errado ao criar avaliação ${err}`,
      );
    });
    return 'Avaliação criada com sucesso';
  }

  async ratingCompleteInfo() {
    return await this.CRUD.findAll('vw_rating_details')
      .catch(() => {
        throw Error('Erro ao listar os dados da VIEW vw_rating_details');
      })
      .then((res) => res);
  }

  async getRatingsWithReports() {
    return await this.knex
      .raw('SELECT * FROM vw_ratings_with_report WHERE report_count > 0;')
      .catch((err) => {
        throw new BadRequestException(
          `Erro ao tentar buscar avaliações ${err}`,
        );
      })
      .then((res) => res.rows);
  }

  async findAll() {
    return await this.CRUD.findAll()
      .catch(() => {
        throw Error('Erro ao buscar todas as avaliações');
      })
      .then((res) => res);
  }

  async findOne(id: number) {
    return await this.CRUD.findOne({ id })
      .catch()
      .then((res) => {
        if (res.length == 0)
          throw new NotFoundException('Id fornecido não foi encontrado');
        return res[0];
      });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    await this.checkRatingId(id);
    await this.CRUD.update(id, updateRatingDto).catch((err) => {
      throw new BadRequestException('Erro ao tentar atualizar avaliação', err);
    });
    return 'Avaliação atualizada com sucesso';
  }

  async remove(id: number) {
    await this.checkRatingId(id);
    await this.CRUD.delete(id).catch((err) => {
      throw Error(`Erro ao tentar remover estudante: ${err}`);
    });
    return 'Avaliação removida com sucesso';
  }

  async checkClassId(id: number) {
    const classUnB = await this.classService.findOne(id);
    if (classUnB.length == 0)
      throw new NotFoundException('Id da turma fornecido não foi encontrado');
  }

  async getStudentId(email: string) {
    const student = await this.studentService.CRUD.findOne({ email });
    if (student.length == 0)
      throw new NotFoundException(
        'Id do estudante fornecido não foi encontrado',
      );

    return student[0].id;
  }

  async checkRatingId(id: number) {
    const rating = await this.findOne(id);
    if (rating.length == 0)
      throw new NotFoundException('Id fornecido não foi encontrado');
  }
}
