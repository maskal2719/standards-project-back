import { Injectable } from '@nestjs/common';
import { CreateProductSubTypeDto } from './dto/create-product-sub-type.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductSubTypeService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductSubTypeDto: CreateProductSubTypeDto) {
    return this.prisma.productSubType.create({
      data: {
        name: createProductSubTypeDto.name,
        productTypeId: createProductSubTypeDto.productTypeId,
      },
    });
  }

  findAll() {
    return this.prisma.productSubType.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} productSubType`;
  }
}
