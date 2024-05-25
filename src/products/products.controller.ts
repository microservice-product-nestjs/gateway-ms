import { Controller, Delete, Get, Post, Patch, Body, Inject, Query, Param, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, Payload, RpcException } from '@nestjs/microservices';
import { create } from 'domain';
import { catchError, first, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';



@Controller('products')
export class ProductsController {
  
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {
    
    }


  @Post()
  createProduct(@Body() createProductDto: CreateProductDto){
   return this.productsClient.send({cmd: 'create_product'}, createProductDto)
  }

  @Get()
  findProduct(@Query() paginationDto:PaginationDto){
    return this.productsClient.send({cmd: 'find_all_products'}, paginationDto)
  }

  @Get(':id')
  async findOneProduct(@Param('id') id:string){
    
    return await firstValueFrom(this.productsClient.send({cmd: 'find_one_product'}, {id}).pipe(
      catchError(error=>{throw new RpcException(error)})
    ))

    /*
    try{
      const product= await firstValueFrom(this.productsClient.send({cmd: 'find_one_product'}, {id}))
      return product
    }catch (error){
      throw new RpcException(error)
    }
    */
    
    
  }
    


  @Patch(':id')
  async updateProduct(@Param('id', ParseIntPipe) id:string, @Body () updateProductDto: UpdateProductDto){
      return await firstValueFrom(this.productsClient.send({cmd: 'update_product'}, {id, ...updateProductDto}).pipe(catchError(error=>{throw new RpcException(error)})))


  }

  @Delete(':id')
  removeProduct(@Param('id') id:string){
      return this.productsClient.send({cmd: 'delete_product'}, {id})
  }




}
