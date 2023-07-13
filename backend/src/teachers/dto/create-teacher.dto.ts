import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  department_code: number;
}
