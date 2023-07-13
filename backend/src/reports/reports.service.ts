import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CRUD } from '../utils';
import { StudentsService } from '../students/students.service';
import { ClassesService } from '../classes/classes.service';

@Injectable()
export class ReportsService {
  CRUD: CRUD;
  table_name = 'report';
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private studentService: StudentsService,
    private classService: ClassesService,
  ) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex, this.table_name);
  }

  async create(createReportDto: CreateReportDto) {
    const { student_email, rating_id } = createReportDto;

    await this.classService.checkClassId(rating_id);

    const student_id = await this.studentService.getStudentId(student_email);

    await this.CRUD.create({ student_id, rating_id }).catch((err) => {
      throw new BadRequestException(
        `Algo deu errado ao criar relatório ${err}`,
      );
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

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
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
