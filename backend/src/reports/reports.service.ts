import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CRUD } from '../utils';
import { StudentsService } from '../students/students.service';
import { RatingsService } from '../ratings/ratings.service';

@Injectable()
export class ReportsService {
  CRUD: CRUD;
  table_name = 'report';
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private studentService: StudentsService,
    private ratingService: RatingsService,
  ) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex, this.table_name);
  }

  async create(createReportDto: CreateReportDto) {
    const { student_email, rating_id } = createReportDto;

    const student = await this.studentService.findOne({ email: student_email });
    const { student_id } = await this.ratingService.findOne(rating_id);

    if (student.id === student_id)
      throw new BadRequestException(
        'Você não pode denunciar sua própria avaliação',
      );

    await this.CRUD.create({ student_id, rating_id }).catch((err) => {
      throw new BadRequestException(`Algo deu errado ao criar denúncia ${err}`);
    });
    return 'Denuncia criada com sucesso';
  }

  async findAll() {
    return await this.CRUD.findAll()
      .catch(() => {
        throw Error('Erro ao buscar todas as denúncias');
      })
      .then((res) => res);
  }

  async findOne(id: number) {
    return await this.CRUD.findOne({ id })
      .catch((err) => {
        throw Error(`Erro ao buscar denúncia: ${err}`);
      })
      .then((res) => res);
  }

  async remove(id: number) {
    await this.checkReportId(id);
    await this.CRUD.delete(id).catch((err) => {
      throw Error(`Erro ao tentar remover denúncia: ${err}`);
    });
    return 'Denúncia removida com sucesso';
  }

  async checkReportId(id: number) {
    const res = await this.CRUD.findOne({ id });
    if (res.length == 0)
      throw new NotFoundException('Id fornecido não foi encontrado');
  }
}
