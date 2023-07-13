import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  student_email: string;

  @IsNotEmpty()
  @IsPositive()
  rating_id: number;
}
