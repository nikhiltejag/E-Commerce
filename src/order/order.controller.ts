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
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/utilities/roles.decorator';
import { User } from 'src/utilities/user.decorator';
import { OrderService } from './order.service';
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('user')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  listOrders(@User() user: UserDTO) {
    return this.orderService.listOrdersByUser(user);
  }

  @Get(':id')
  listOrderById(@User() user: UserDTO, @Param('id') orderId: string) {
    return this.orderService.findOrderById(user, orderId);
  }

  @Put(':orderId/prod/:id')
  addProd(
    @User() user: UserDTO,
    @Param('id') prodId: string,
    @Param('orderId') orderId: string,
  ) {
    return this.orderService.addProduct(user, orderId, prodId);
  }

  @Post('prod/:id')
  createOrder(
    @User() user: UserDTO,
    @Param('id') prodId: string,
    @Body() order,
  ) {
    return this.orderService.createOrder(user, prodId);
  }

  @Delete(':id')
  deleteOrder(@User() user: UserDTO, @Param('id') orderId: string) {
    return this.orderService.deleteOrder(user, orderId);
  }
}
