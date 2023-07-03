import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateDepartamentDto {
  @IsNotEmpty()
  @IsPositive()
  code: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
