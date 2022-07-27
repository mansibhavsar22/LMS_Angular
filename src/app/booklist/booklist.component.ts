import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalformComponent } from '../modalform/modalform.component';
import { BookserviceService } from '../Services/bookservice.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
// import { getPager } from 'ap-pagination';

declare var $: any;

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
  closeResult: string;

  PageNumber: any = 1;
  PageSize: any;
  TotalRecords: any;
  count: any;
  pageField: [];
  TotalPages: any;
  exactPageList: any;
  pager:any ={};

  @Output() DeleteEvent = new EventEmitter<any>();
  @Input() list: any;

  constructor(
    public serviceobj: BookserviceService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  // Delete(Id:any){
  //   $("#deletemodal").modal("show");
  //   debugger;
  //   this.serviceobj.Delete(Id).subscribe((data:any) => {
  //   });
  //   debugger;
  //   this.toastr.warning('Deleted Successfully', 'Delete', {
  //     timeOut: 3000,
  //   });
  // }

  // setPage(PageNumber:any) {
  //   this.pager = getPager(this.TotalRecords, page, this.PageSize);    
  //   }

  Closemodal() {
    $('#deletemodal').modal('hide');
  }

  // Edit(Id:any) {
  //   debugger;
  //     this.router.navigateByUrl('/addbook',{state: Id});
  // }

  OpenDailog(Id: any) {
    debugger;
    const dialogRef = this.dialog.open(ModalformComponent, {
      height: '510px',
      width: '600px',
      data: Id,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      debugger;
      this.getlist();
      window.location.reload();
    });
  }

  getlist() {
    this.serviceobj
      .Books(this.PageNumber, this.PageSize)
      .subscribe((data: any) => {
        this.bookslist = data.bookslist;
        this.categorylist = data.categorieslist;
        this.publisherlist = data.publisherslist;
        this.Totalcount();
      });
  }

  ngOnInit(): void {
    this.getlist();
  }

  onClick(page: any, i: any) {
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
    this.serviceobj
      .Books(this.PageNumber, this.PageSize)
      .subscribe((res: any) => {
        this.count = res;
        this.totalNoOfPages();
      });
  }
}
function page(length: number, page: any, defaultEntrie: number): any {
  throw new Error('Function not implemented.');
}

