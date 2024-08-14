import { Module } from '@nestjs/common';
import { ProductSubTypeService } from './product-sub-type.service';
import { ProductSubTypeController } from './product-sub-type.controller';
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [ProductSubTypeController],
  providers: [ProductSubTypeService, PrismaService],
})
export class ProductSubTypeModule {}
