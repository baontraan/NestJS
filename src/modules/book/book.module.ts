import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity.js';
import { BookController } from './book.controller.js';
import { BookService } from './book.service.js';
import { BookOwnerMiddleware } from '../../middleware/AuthorAuth/bookOwner.middleware.js';

@Module({
  controllers: [BookController],
  providers: [BookService],
  exports: [],
  imports: [TypeOrmModule.forFeature([Book])],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BookOwnerMiddleware).forRoutes(
      {
        path: '/api/v1/book/:id',
        method: RequestMethod.PUT,
      },
      // {
      //   path: '/api/v1/book/:id',
      //   method: RequestMethod.DELETE,
      // },
    );
  }
}
