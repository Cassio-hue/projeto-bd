import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  turma: number;

  @IsNotEmpty()
  @IsString()
  period: string;

  @IsNotEmpty()
  @IsString()
  schedule: string;

  @IsNotEmpty()
  @IsString()
  local: string;

  @IsNotEmpty()
  @IsString()
  discipline_id: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  teacher_id: number;
}
