import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nikhil',
    password: 'password',
    database: 'test',
    entities: [],
    synchronize: true,
    logging: false
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
