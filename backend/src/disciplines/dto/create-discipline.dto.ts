import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateDisciplineDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  code: number;

  @IsNotEmpty()
  @IsString()
  discipline_name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  department_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  teacher_id: number;
}
