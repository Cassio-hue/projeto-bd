import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { StudentsModule } from './students/students.module';
import { DepartmentsModule } from './departments/departments.module';
import { TeachersModule } from './teachers/teachers.module';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { ClassesModule } from './classes/classes.module';
import { AuthModule } from './auth/auth.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: process.env.DB_URL,
      },
    }),
    StudentsModule,
    DepartmentsModule,
    TeachersModule,
    DisciplinesModule,
    ClassesModule,
    AuthModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
