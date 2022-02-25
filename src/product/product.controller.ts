import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Product } from 'src/entities/product.entity';
import { User as UserDTO } from 'src/entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/utilities/roles.decorator';
import { User } from 'src/utilities/user.decorator';
import { CreateProductDTO } from './product.dto';
import { ProductService } from './product.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listAll() {
    return this.productService.findAll();
  }

  @Get('mine')
  @Roles('seller')
  async listMyProd(@User() user: UserDTO) {
    return this.productService.findByOwner(user);
  }

  @Post()
  @Roles('seller')
  async create(@Body() product: CreateProductDTO, @User() user: UserDTO) {
    return this.productService.create(product, user);
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @Roles('seller')
  update(
    @Body() product: Product,
    @Param('id') id: string,
    @User() user: UserDTO,
  ) {
    return this.productService.update(id, product, user);
  }

  @Delete(':id')
  @Roles('seller')
  async delete(@Param('id') id: string, @User() user: UserDTO) {
    return this.productService.delete(id, user);
  }
}
