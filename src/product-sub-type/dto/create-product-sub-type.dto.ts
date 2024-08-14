import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductSubTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  productTypeId: number;
}
