export class BooksModel {
  BookId: number;
  BookName: string;
  PublisherId: string;
  PublisherName: string;
  CategoryId: string;
  CategoryName: string;
  TotalRecords: number;
  PageNumber: number = 1;
  PageSize: number = 10;
  TotalPages: number;
}
