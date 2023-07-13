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

@Injectable()
export class RatingsService {
  CRUD: CRUD;
  table_name = 'rating';
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private studentService: StudentsService,
  ) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex, this.table_name);
  }

  async create(createRatingDto: CreateRatingDto) {
    const student_id = await this.getStudentId(createRatingDto.student_email);
    const data = {
      student_id: student_id,
      score: createRatingDto.score,
      comment: createRatingDto.comment,
    };
    await this.CRUD.create(data).catch(() => {
      throw new BadRequestException('Algo deu errado ao criar avaliação');
    });
    return 'Avaliação criada com sucesso';
  }

  findAll() {
    return `This action returns all ratings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }

  async getStudentId(email: string) {
    const student = await this.studentService.CRUD.findOne({ email });
    if (student.length == 0)
      throw new NotFoundException('Id fornecido não foi encontrado');

    return student[0].id;
  }

  async checkRatingId(id: number) {
    const rating = await this.findOne(id);
    if (rating.length == 0)
      throw new NotFoundException('Id fornecido não foi encontrado');
  }
}
