import { BookService } from './book.service.js';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import BookRequest from './dto/BookRequest.dto.js';

@Controller('/api/v1/book')
export class BookController {
  // DI Constructor
  constructor(private readonly bookService: BookService) {}

  // Methods

  // ==== Get All ====

  @Get()
  getAllBooks() {
    return this.bookService.findAll();
  }

  // ==== GET BY ID ====
  @Get('/:id')
  getBookById(@Param('id') id: number) {
    return this.bookService.findById(id);
  }

  // ==== CREATE NEW BOOK ====
  @Post()
  createNewBook(@Body(new ValidationPipe()) request: BookRequest) {
    return this.bookService.create(request);
  }

  // ==== UPDATE BY ID ====
  @Put('/:id')
  updateBookById(
    @Param('id') id: number,
    @Body(new ValidationPipe()) request: BookRequest,
  ) {
    return this.bookService.update(id, request);
  }

  // ==== DELETE BY ID ====
  @Delete('/:id')
  deleteBookById(@Param('id') id: number) {
    return this.bookService.delete(id);
  }
}
