import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private prodService: ProductService,
  ) {}

  async listOrdersByUser(user: User) {
    const orders = await this.orderRepo.find({
      where: { owner: user },
    });
    if (!orders) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }

    return orders;
  }

  async findOrderById(user: User, orderId: string) {
    const [order] = await this.orderRepo.find({
      where: { id: orderId },
    });
    return order;
  }

  async createOrder(user: User, prodId: string) {
    const prod = await this.prodService.findOne(prodId);
    if (!prod) {
      throw new HttpException('Product does not exist', HttpStatus.NO_CONTENT);
    }
    const newOrder = this.orderRepo.create({
      owner: user,
      products: [prod],
      totalPrice: prod.price,
    });
    await this.orderRepo.save(newOrder);
    return { msg: `Order created with id: ${newOrder.id}` };
  }

  async addProduct(user: User, orderId: string, prodId: string) {
    const [order] = await this.orderRepo.find({
      where: { id: orderId },
      relations: ['owner'],
    });

    if (!order) {
      throw new HttpException('No order exixt', HttpStatus.BAD_REQUEST);
    }

    if (order.owner.id !== user.id) {
      throw new HttpException(
        'You do not own this order',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const product = await this.prodService.findOne(prodId);

    if (!product) {
      throw new HttpException('No product exist', HttpStatus.NO_CONTENT);
    }
    order.products = [...order.products, product];
    order.totalPrice = order.totalPrice + product.price;

    await this.orderRepo.save(order);
    return { msg: `Prod id:${prodId} is added to order:${orderId}` };
  }

  async deleteOrder(user: User, orderId: string) {
    const [order] = await this.orderRepo.find({
      where: { id: orderId },
      relations: ['owner'],
    });

    if (!order) {
      throw new HttpException('No order found', HttpStatus.NO_CONTENT);
    }

    if (user.id !== order.owner.id) {
      throw new HttpException(
        'You do not own this order',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.orderRepo.remove(order);
    return { msg: `Order ${orderId} deleted successfully` };
  }
}
