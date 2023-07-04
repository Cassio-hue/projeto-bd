import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsNumberString()
  @Length(9, 9, { message: 'A string must be exactly 9 characters long.' })
  teacherID: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  departament_id: number;
}
