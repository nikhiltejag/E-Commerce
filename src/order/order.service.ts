import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) { }

    async listOrdersByUser(user: User) {
        const orders = await this.orderRepo.find({ owner: user })
        if (!orders) {
            throw new HttpException("No Orders Found", HttpStatus.NO_CONTENT)
        }

        return orders
    }

    async createOrder(order) { // get user info
        const newOrder = this.orderRepo.create(order)
        await this.orderRepo.save(newOrder)
        return order
    }
}
