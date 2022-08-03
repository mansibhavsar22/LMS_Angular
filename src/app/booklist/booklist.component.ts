import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalformComponent } from '../modalform/modalform.component';
import { BookserviceService } from '../Services/bookservice.service';
import { MatDialog } from '@angular/material/dialog';
import { BooksModel } from '../Booksmodel';

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
    debugger;
    if(this.SearchingData != null){
      this.objBook.TotalPages = this.SearchingData.TotalPages;
    }
   
  }

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

  ShowModal() {
    const dialogRef = this.dialog.open(ModalformComponent, {
      height: '450px',
      width: '600px',
    });
  }

  getlist() {
    this.serviceobj.Booksearch(this.objBook).subscribe((data: any) => {
      debugger;
      this.bookslist = data.bookslist;
      this.TotalRecords = data.TotalRecords;
      this.PageSize = data.PageSize;
      this.PageNumber = data.PageNumber;
      this.objBook.TotalPages = data.TotalPages;
    });
  }

  ngOnInit(): void {
    debugger
    if(this.SearchingData != null){
      this.objBook = this.SearchingData;
    }
    this.PageSizeChange()

    console.log(this.list);
    this.objBook.TotalPages = this.list.TotalPages;
  }

  PageSizeChange(){
    if(this.SearchingData != null){
      this.objBook = this.SearchingData;
    }
    //this.TotalRecords = this.list.length;
    this.objBook.PageNumber=1;
    this.serviceobj.Booksearch(this.objBook).subscribe((data: any) => {
      debugger;
      this.list = data.bookslist;
      this.objBook.TotalPages = data.TotalPages;
    console.log("Data To be Search: ");
    console.log(this.SearchingData);
    });
  }

  PageChange(){
    if(this.SearchingData != null){
      this.objBook = this.SearchingData;
    }
    this.serviceobj.Booksearch(this.objBook).subscribe((data: any) => {
      debugger;
      this.list = data.bookslist;
      this.objBook.TotalPages = data.TotalPages;
      console.log("Data To be Search: ");
    console.log(this.SearchingData);
    });
  }
}
