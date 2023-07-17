import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateDisciplineDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  discipline_name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  department_code: number;
}
