import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingDto } from './create-rating.dto';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  score?: number;

  @IsNotEmpty()
  @IsString()
  comment?: string;
}
