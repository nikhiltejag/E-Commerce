import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepo.find();

    // products do not contain owner_id as it a joined column
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({ id });

    if (!product) {
      throw new HttpException('No product found', HttpStatus.NO_CONTENT);
    }
    return product;
  }

  async findByOwner(user: User) {
    return this.productRepo.find({ owner: user });
  }

  async create(
    product: CreateProductDTO,
    user: User,
  ): Promise<CreateProductDTO> {
    const newproduct = this.productRepo.create({
      ...product,
      owner: user,
    });
    const { owner, ...res } = await this.productRepo.save(newproduct);

    return res;
  }

  async update(id: string, productDTO: Product, user: User) {
    const [product] = await this.productRepo.find({
      where: { id },
      relations: ['owner'],
    });
    if (!product) {
      throw new HttpException('Product do not exist', HttpStatus.BAD_REQUEST);
    }
    if (product.owner.id !== user.id) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    this.productRepo.merge(product, productDTO);
    this.productRepo.save(product);
    return product;
  }

  async delete(id: string, user: User): Promise<Product> {
    const [product] = await this.productRepo.find({
      where: { id },
      relations: ['owner'],
    });
    if (!product) {
      throw new HttpException(
        'No product exist with given id',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (product.owner.id !== user.id) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.productRepo.remove(product);

    return product;
  }
}
