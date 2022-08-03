import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BooksModel } from '../Booksmodel';
import { ModalformComponent } from '../modalform/modalform.component';
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
  TotalRecords: number;
  TotalPages: any;
  SearchingData : any;
  objBook : BooksModel = new BooksModel();

  constructor(
    public serviceobj: BookserviceService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
   this.onSumbit();
  }

  Delete(book: any) {
    this.serviceobj.Id = book.BookId;
    this.serviceobj.Delete().subscribe(() => {
      debugger;
      this.onSumbit();
      this.toastr.success('Deleted Successfully', 'Delete', {
        timeOut: 3000,
      });
    });
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
      this.TotalRecords = data.TotalRecords;
      this.PageSize = data.PageSize;
      this.PageNumber = data.PageNumber;
      this.objBook.TotalPages = data.TotalPages;
    });
  }
}
