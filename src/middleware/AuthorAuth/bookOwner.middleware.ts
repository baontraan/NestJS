import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { BookService } from '../../modules/book/book.service.js';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class BookOwnerMiddleware implements NestMiddleware {
  // DI Constructor

  constructor(private readonly bookService: BookService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Lấy ID book từ URL, convert String -> Number

    const bookId = parseInt(req.params.id as string);

    // Đọc dữ liệu từ header có tên 'user-id' do client gửi kèm
    const userIdHeader = req.headers['user-id'];

    // Lấy userId gửi kèm trong header, để Authentication
    const userId = userIdHeader ? parseInt(userIdHeader as string) : null;

    if (!bookId) next();

    try {
      const book = await this.bookService.findById(bookId);

      // Nếu ko cung cấp userID, hoặc có cung cấp nhưng ko khớp => ko đủ quyền
      // Authorization
      if (!userId || book.authorId !== userId) {
        throw new ForbiddenException(
          'You are not the author of this book. You do not have permission to update or delete it!',
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
