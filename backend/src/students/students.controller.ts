import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createStudentDto: CreateStudentDto, @UploadedFile() picture) {
    const boolean = createStudentDto.is_admin;
    if (boolean == 'true') createStudentDto.is_admin = true;
    else createStudentDto.is_admin = false;

    createStudentDto.picture = picture.buffer;
    return this.studentsService.create(createStudentDto);
  }

  @Post('rating')
  createRating(@Body() createRatingDto: CreateRatingDto) {
    return this.studentsService.createRating(createRatingDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':identifier')
  findOne(@Param('identifier') identifier: string) {
    if (isNaN(+identifier)) {
      return this.studentsService.findOne({ email: identifier });
    } else {
      return this.studentsService.findOne({ id: +identifier });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
