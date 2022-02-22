import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
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
    const orders = await this.orderRepo.find({ owner: user });
    if (!orders) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }

    return orders;
  }

  async createOrder(user: User) {
    const newOrder = this.orderRepo.create({ owner: user, products: [] });
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

    const product: Product = await this.prodService.findOne(prodId);

    if (!product) {
      throw new HttpException('No product exist', HttpStatus.NO_CONTENT);
    }
    console.log(typeof order.products);
    order.products = [...order.products, product];
    order.totalPrice = order.totalPrice + product.price;

    await this.orderRepo.save(order);
    return { msg: `Prod id:${prodId} is added to order:${orderId}` };
  }
}
