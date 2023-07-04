import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartamentsController } from './departments.controller';

@Module({
  controllers: [DepartamentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
