import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
// import { BooksModel } from '../Bookmodel';

declare var $ : any;

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css'],
})
export class BooklistComponent implements OnInit {
  title = 'Library Management';
  bookslist: any;
  categorylist: any;
  publisherlist: any;

  PageNumber: any = 1;
  PageSize: any;
  TotalRecords: any;
  count: any;
  pageField:[];
  TotalPages: any;
  exactPageList: any;

  constructor(public serviceobj: AppService,private router: Router) {
    debugger;
    this.getlist();
  }

  Close(){
    $("#addmodal").modal("hide");
  }

  ShowModal(){
    $("#addmodal").modal("show");
  }

  AddComponent() {
    this.router.navigateByUrl('/addbook');
};

  getlist() {
    this.serviceobj.Books(this.PageNumber, this.PageSize).subscribe((data: any) => {
      debugger;
      this.bookslist = data.bookslist;
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
      this.Totalcount();
    });
  }

  ngOnInit(): void {}

  onClick(page:any, i:any) {
    this.bookslist = [];
    this.PageNumber = [];
    this.PageNumber[i] = true;
    this.PageNumber = page;
    this.getlist();
  }

  onSumbit(searchdata: any) {
    debugger;
    this.serviceobj.Booksearch(searchdata).subscribe((data: any) => {
      this.bookslist = data.bookslist;
    });
  }

  //Method For Pagination
  totalNoOfPages() {
    this.TotalPages = Number(this.count / this.PageSize);
    let tempPageData = this.TotalPages.toFixed();
    if (Number(tempPageData) < this.TotalPages) {
      this.exactPageList = Number(tempPageData) + 1;
      this.serviceobj.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.serviceobj.exactPageList = this.exactPageList;
    }
    this.serviceobj.pageOnLoad();
    this.pageField = this.serviceobj.pageField;
  }

  Totalcount() {
    this.serviceobj.Books(this.PageNumber,this.PageSize).subscribe((res: any) => {
      this.count = res;
      this.totalNoOfPages();
    });
  }
}
