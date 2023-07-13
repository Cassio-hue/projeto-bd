import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  score: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  student_email: string;

  @IsNotEmpty()
  @IsNumber()
  class_id: number;
}
