import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductSubTypeService } from './product-sub-type.service';
import { CreateProductSubTypeDto } from './dto/create-product-sub-type.dto';
import { UpdateProductSubTypeDto } from './dto/update-product-sub-type.dto';

@Controller('product-sub-type')
export class ProductSubTypeController {
  constructor(private readonly productSubTypeService: ProductSubTypeService) {}

  @Post()
  create(@Body() createProductSubTypeDto: CreateProductSubTypeDto) {
    return this.productSubTypeService.create(createProductSubTypeDto);
  }

  @Get()
  findAll() {
    return this.productSubTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSubTypeService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProductSubTypeDto: UpdateProductSubTypeDto,
  // ) {
  //   return this.productSubTypeService.update(+id, updateProductSubTypeDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productSubTypeService.remove(+id);
  // }
}
