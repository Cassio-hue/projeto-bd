import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsNumberString()
  @Length(9, 9, { message: 'A string must be exactly 9 characters long.' })
  studentID: string;

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
}
