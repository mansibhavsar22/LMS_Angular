import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalformComponent } from '../modalform/modalform.component';
import { BookserviceService } from '../Services/bookservice.service';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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

  @Input() list:any;

  constructor(
    public serviceobj: BookserviceService,
    public dialog: MatDialog,
    private router: Router) {
    // this.getlist();
  }

  Delete(Id:any){

  }

  // Edit(Id:any) { 
  //   debugger;
  //     this.router.navigateByUrl('/addbook',{state: Id});
  // } 

  OpenDailog(Id:any) { 
    debugger;
    const dialogRef = this.dialog.open(ModalformComponent,{
      height: '510px',
      width: '600px',
      data:Id,
    });
      dialogRef.afterClosed().subscribe((data:any) => {
        debugger;
        this.getlist();
        window.location.reload();
      });
  }

  getlist() {
    this.serviceobj.Books(this.PageNumber, this.PageSize).subscribe((data: any) => {
      this.bookslist = data.bookslist;
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
      this.Totalcount();
    });
  }

  ngOnInit(): void {
    this.getlist();
  }

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
