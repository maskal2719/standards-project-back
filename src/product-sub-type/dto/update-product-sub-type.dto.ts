import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSubTypeDto } from './create-product-sub-type.dto';

export class UpdateProductSubTypeDto extends PartialType(CreateProductSubTypeDto) {}
