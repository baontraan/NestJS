import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class BookRequest {
  @IsString({ message: 'Title must be a string!' }) // Sai data type
  @IsNotEmpty({ message: 'Title cannot be empty!' }) // null || undefined || ""
  title: string;

  @IsString({ message: 'Author must be a string!' })
  @IsNotEmpty({ message: 'Author cannot be empty!' })
  author: string;

  @IsString({ message: 'Description must be a string!' })
  @IsNotEmpty({ message: 'Description cannot be empty!' })
  description: string;

  @IsNotEmpty({ message: 'Published Year cannot be empty!' })
  @IsNumber({}, { message: 'Published Year must be a number!' })
  publishedYear: number;
}
