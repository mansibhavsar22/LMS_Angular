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
  PageSize: number;
  TotalRecords: number;
  TotalPages: any;
  book: BooksModel = new BooksModel();

  @Output() DeleteEvent = new EventEmitter<any>();
  @Output() PageSizeEvent = new EventEmitter<any>();
  @Input() list: any;

  constructor(
    public serviceobj: BookserviceService,
    public dialog: MatDialog
  ) {}

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
    //alert(this.PageNumber + ' ' +this.PageSize)
    this.serviceobj.Books().subscribe((data: any) => {
      debugger;
      this.bookslist = data.bookslist;
      this.TotalRecords = data.TotalRecords;
      this.PageSize = data.PageSize;
      this.PageNumber = data.PageNumber;
      this.TotalPages = data.TotalPages;
    });
  }

  setData() {
    this.serviceobj.Booksearch(this.book).subscribe((data: any) => {
      debugger;
      this.bookslist = data.bookslist;
      this.book.TotalPages = data.TotalPages;
    });
  }

  ngOnInit(): void {
    this.getlist();
    //this.setData();
  }
}
