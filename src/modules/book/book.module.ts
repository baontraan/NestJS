import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity.js';
import { BookController } from './book.controller.js';
import { BookService } from './book.service.js';

@Module({
  controllers: [BookController],
  providers: [BookService],
  exports: [],
  imports: [TypeOrmModule.forFeature([Book])],
})
export class BookModule {}
