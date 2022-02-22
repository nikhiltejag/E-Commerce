import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User as UserDTO } from 'src/entities/user.entity';
import { User } from 'src/utilities/user.decorator';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  listOrders(@User() user: UserDTO) {
    return this.orderService.listOrdersByUser(user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createOrder(@User() user: UserDTO, @Body() order) {
    return this.orderService.createOrder(order);
  }
}
