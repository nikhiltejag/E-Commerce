import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Product } from 'src/entities/product.entity';
import { User as UserDTO } from 'src/entities/user.entity';
import { SellerGuard } from 'src/guards/seller.guard';
import { User } from 'src/utilities/user.decorator';
import { CreateProductDTO } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async listAll() {
        return this.productService.findAll()
    }

    @Get('mine')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async listMyProd(@User() user: UserDTO) {
        return this.productService.findByOwner(user)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async create(@Body() product: Product, @User() user: UserDTO) {
        return this.productService.create(product, user)
    }

    @Get(':id')
    async read(@Param('id') id: string) {
        return this.productService.findOne(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    update(@Body() product: Product, @Param('id') id: string, @User() user: UserDTO) {
        return this.productService.update(id, product, user)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async delete(@Param('id') id: string, @User() user: UserDTO) {
        return this.productService.delete(id, user)
    }
}
