import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateDepartamentDto {
  @IsNotEmpty()
  @IsPositive()
  code: number;

  @IsNotEmpty()
  @IsString()
  departamentName: string;
}
