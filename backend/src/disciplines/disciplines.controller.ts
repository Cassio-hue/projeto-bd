import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @Post()
  create(@Body() createDisciplineDto: CreateDisciplineDto) {
    return this.disciplinesService.create(createDisciplineDto);
  }

  @Get()
  findAll() {
    return this.disciplinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplinesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplinesService.remove(id);
  }
}
