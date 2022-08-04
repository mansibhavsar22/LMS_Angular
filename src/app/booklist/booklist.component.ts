import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalformComponent } from '../modalform/modalform.component';
import { BookserviceService } from '../Services/bookservice.service';
import { MatDialog } from '@angular/material/dialog';
import { BooksModel } from '../Booksmodel';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';

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

  PageNumber: number;
  PageSize: number = 10;
  TotalRecords: number;
  TotalPages: any;
  objBook : BooksModel = new BooksModel();

  @Output() DeleteEvent = new EventEmitter<any>();
  @Input() list: any;
  @Input() SearchingData: any;

  constructor(
    public serviceobj: BookserviceService,
    public dialog: MatDialog
  ) {
    if(this.SearchingData != null){
      this.objBook.TotalPages = this.SearchingData.TotalPages;
    }
  }

  OpenDailog(Id: any,title:any) {
    const dialogRef = this.dialog.open(ModalformComponent, {
      height: '510px',
      width: '600px',
      data: {Id,title},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getlist();
      this.ngOnInit();
    });
  }

  DeleteDialog(Id: any,title:any) {
    const dialogRef = this.dialog.open(DeletemodalComponent, {
      height: '415px',
      width: '600px',
      data: {Id,title},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getlist();
      this.ngOnInit();
    });
  }

  ShowModal(title:any) {
    const dialogRef = this.dialog.open(ModalformComponent, {
      height: '450px',
      width: '600px',
      data: {title}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getlist();
      this.ngOnInit();
    });
  }

  getlist() {
    this.serviceobj.Booksearch(this.objBook).subscribe((data: any) => {
      this.bookslist = data.bookslist;
      this.TotalRecords = data.TotalRecords;
      this.PageSize = data.PageSize;
      this.PageNumber = data.PageNumber;
      this.objBook.TotalPages = data.TotalPages;
    });
  }

  ngOnInit(): void {
    if(this.SearchingData != null){
      this.objBook = this.SearchingData;
    }
    this.PageSizeChange()
    this.objBook.TotalPages = this.list.TotalPages;
  }

  PageSizeChange(){
    if(this.SearchingData != null){
      this.objBook = this.SearchingData;
    }
    this.objBook.PageNumber=1;
    this.serviceobj.Booksearch(this.objBook).subscribe((data: any) => {
      this.list = data.bookslist;
      this.objBook.TotalPages = data.TotalPages;
    });
  }

  PageChange(){
    if(this.SearchingData != null){
      this.objBook = this.SearchingData;
    }
    this.serviceobj.Booksearch(this.objBook).subscribe((data: any) => {
      this.list = data.bookslist;
      this.objBook.TotalPages = data.TotalPages;
    });
  }
}
