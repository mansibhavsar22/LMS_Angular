import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BooksModel } from '../Booksmodel';
import { BookserviceService } from '../Services/bookservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  title = 'Library Management';
  categorylist: any;
  publisherlist: any;
  bookslist: any;

  PageNumber: number;
  PageSize: number;
  TotalPages: any;
  SearchingData : any;
  objBook : BooksModel = new BooksModel();

  constructor(
    public serviceobj: BookserviceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
   this.onSumbit();
  }

  onSumbit() {
    debugger;
    this.SearchingData = this.objBook;
    this.serviceobj.Booksearch(this.objBook).subscribe((data: any) => {
      debugger;
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
      this.SearchingData.TotalPages = data.TotalPages;
      this.bookslist = data.bookslist;
      this.PageSize = data.PageSize;
      this.PageNumber = data.PageNumber;
      this.objBook.TotalPages = data.TotalPages;
    });
  }
}
