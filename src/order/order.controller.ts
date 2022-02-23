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

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  listOrderById(@User() user: UserDTO, @Param('id') orderId: string) {
    return this.orderService.findOrderById(user, orderId);
  }

  @Put(':orderId/prod/:id')
  @UseGuards(AuthGuard('jwt'))
  addProd(
    @User() user: UserDTO,
    @Param('id') prodId: string,
    @Param('orderId') orderId: string,
  ) {
    return this.orderService.addProduct(user, orderId, prodId);
  }

  @Post('prod/:id')
  @UseGuards(AuthGuard('jwt'))
  createOrder(
    @User() user: UserDTO,
    @Param('id') prodId: string,
    @Body() order,
  ) {
    return this.orderService.createOrder(user, prodId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteOrder(@User() user: UserDTO, @Param('id') orderId: string) {
    return this.orderService.deleteOrder(user, orderId);
  }
}
