import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
export class UpdateTeacherDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  department_id?: number;
}
