import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { StudentsModule } from '../students/students.module';
import { ClassesModule } from '../classes/classes.module';
import { RatingsModule } from '../ratings/ratings.module';

@Module({
  imports: [StudentsModule, ClassesModule, RatingsModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
