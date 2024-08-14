 import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProductSubTypeModule } from './product-sub-type/product-sub-type.module';
import { ProductTypeModule } from './product-type/product-type.module';

@Module({
  imports: [ProductsModule, ProductSubTypeModule, ProductTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
