import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductTypeService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductTypeDto: CreateProductTypeDto) {
    return this.prisma.productType.create({
      data: {
        name: createProductTypeDto.name,
      },
    });
  }

  findAll() {
    return this.prisma.productType.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} productType`;
  // }
  //
  // update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
  //   return `This action updates a #${id} productType`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} productType`;
  // }
}
