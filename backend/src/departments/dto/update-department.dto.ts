import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UpdateDepartamentDto {
  @IsNotEmpty()
  @IsPositive()
  code: number;

  @IsNotEmpty()
  @IsString()
  departamentName: string;
}
