import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>) { }

    async findAll() {
        return await this.productRepo.find()
    }

    async findOne(id: string): Promise<Product[]> {
        const product = await this.productRepo.find({ id })

        if (!product) {
            throw new HttpException('No product found', HttpStatus.NO_CONTENT)
        }
        return product
    }

    async findByOwner(user: User) {
        return this.productRepo.find(user)
    }

    async create(productDTO: Product, user: User): Promise<Product> {
        const product = await this.productRepo.create({ ...productDTO, owner: user })
        // product.owner = user
        // console.log(product, user)
        const res = await this.productRepo.save(product)

        return res
    }

    async update(id: string, productDTO: Product, user: User) { //Promise<Product>{
        const product = await this.productRepo.findOne(id)
        if (product.owner !== user) {
            throw new HttpException('You do not own this product', HttpStatus.UNAUTHORIZED)
        }
        this.productRepo.merge(product, productDTO)
        this.productRepo.save(product)
        return product
    }

    async delete(id: string, user: User): Promise<Product> {
        const product = await this.productRepo.findOne(id);
        if (product.owner !== user) {
            throw new HttpException('You do not own this product', HttpStatus.UNAUTHORIZED)
        }
        await this.productRepo.remove(product)

        return product
    }
}
