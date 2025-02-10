import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class GradeDto {
  @IsString()
  @IsNotEmpty()
  ageGroup: string;

  @IsNotEmpty()
  resultValue: number;

  @IsNotEmpty()
  grade: number;
}

export class CreateNormativeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GradeDto)
  grades: GradeDto[];
}
