import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsEmail()
  student_email: string;

  @IsNotEmpty()
  @IsPositive()
  rating_id: number;
}
