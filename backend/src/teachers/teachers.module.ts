import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [DepartmentsModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
