import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { ProductModule } from 'src/product/product.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ProductModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
