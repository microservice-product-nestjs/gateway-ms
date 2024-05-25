import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE, envs } from 'src/config';
import { options } from 'joi';

@Module({
  controllers: [ProductsController],
  imports: [ ClientsModule.register([

    {
      name: PRODUCT_SERVICE, 
      transport: Transport.TCP,
      options:{
        host: envs.ProductsMicroservicesHost,
        port: envs.ProductsMicroservicesPort
      }
    },

  
  ])],
  providers: [],

})
export class ProductsModule {}
