import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  class: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
