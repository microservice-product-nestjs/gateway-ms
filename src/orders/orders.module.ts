import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import { ORDER_SERVICE } from '../config/services';

@Module({
  imports: [ClientsModule.register([
    {
      name: ORDER_SERVICE, 
      transport: Transport.TCP, 
      options: 
        {
          host: envs.OrdersMicroservicesHost, 
          port: envs.OrdersMicroservicesPort
        }
      }
    
  ])],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
