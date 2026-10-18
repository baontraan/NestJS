import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity.js';
import { Not, Repository } from 'typeorm';

@Injectable()
export class BookService {
  // DI Constructor

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Methods

  // === READ ALL ====
  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  // ==== READ BY ID ====
  async findById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) throw new NotFoundException(`Book not found with id = ${id}`);

    return book;
  }

  // ==== CREATE ====
  async create(bookData: Partial<Book>): Promise<Book> {
    if (bookData.title) {
      const duplicateBook = await this.bookRepository.findOneBy({
        title: bookData.title,
      });

      if (duplicateBook) {
        throw new ConflictException(
          `Book with title '${bookData.title}' already exists`,
        );
      }
    }

    const newBook = this.bookRepository.create(bookData);
    return this.bookRepository.save(newBook);
  }

  // ==== UPDATE ====

  async update(id: number, bookData: Partial<Book>): Promise<Book> {
    const existingBook = await this.bookRepository.findOneBy({ id });

    if (!existingBook) {
      throw new NotFoundException(`Book not found with id = ${id}`);
    }

    if (bookData.title) {
      const checkDuplicateBook = await this.bookRepository.findOne({
        where: {
          title: bookData.title,
          id: Not(id),
        },
      });

      if (checkDuplicateBook)
        throw new ConflictException(
          `Book with title '${bookData.title}' already exists`,
        );
    }

    await this.bookRepository.update(id, bookData);

    const updatedBook = await this.bookRepository.findOneBy({ id });
    return updatedBook!;
  }

  // ==== DELETE ====
  async delete(id: number) {
    const result = await this.bookRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Book not found with id = ${id}`);
    }

    return { message: `Deleted book with id = ${id} successfully` };
  }
}
