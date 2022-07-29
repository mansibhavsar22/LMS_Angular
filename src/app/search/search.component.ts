import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookserviceService } from '../Services/bookservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title = 'Library Management';
  categorylist: any;
  publisherlist: any;
  bookslist: any;

  PageNumber: any = 1;
  PageSize: number;
  TotalRecords: number;
  TotalPages: any;

  constructor(
    public serviceobj: BookserviceService,
    private toastr : ToastrService) { 
  }

  ngOnInit(): void {
    this.getlist();
  }

  Delete(book: any) {
    this.serviceobj.Id= book.BookId;
    this.serviceobj.Delete().subscribe((data: any) => {
      debugger;
      this.getlist();
      this.toastr.warning('Deleted Successfully', 'Delete', {
        timeOut: 3000,
      });
    });
  }

  onSumbit(searchdata: any) {
    debugger;
    this.serviceobj.Booksearch(searchdata).subscribe((data: any) => {
      this.bookslist = data.bookslist;
      this.TotalRecords = data.TotalRecords;
      this.PageSize = data.PageSize;
      this.PageNumber = data.PageNumber;
      this.TotalPages = data.TotalPages;
    });
  }

  getlist() {
    this.serviceobj.Books().subscribe((data: any) => {
      debugger;
      this.bookslist = data.bookslist;
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
    });
  }
}
