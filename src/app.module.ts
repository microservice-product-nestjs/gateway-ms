import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
