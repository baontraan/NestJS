import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BookService } from '../modules/book/book.service.js';
import { Request } from 'express';

@Injectable()
export class BookOwnerGuard implements CanActivate {
  // DI Constructor
  constructor(private readonly bookService: BookService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const bookId = parseInt(request.params.id as string, 10);
    const userIdHeader = request.headers['user-id'];
    const userId = userIdHeader ? parseInt(userIdHeader as string, 10) : null;

    if (!bookId) return true;

    const book = await this.bookService.findById(bookId);

    if (!userId || book.authorId !== userId) {
      throw new ForbiddenException(
        'You are not the author of this book. You do not have permission delete it!. Use Guard',
      );
    }

    return true;
  }
}
