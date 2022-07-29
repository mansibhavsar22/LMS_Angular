import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BooksModel } from '../Booksmodel';
import { ModalformComponent } from '../modalform/modalform.component';
import { BookserviceService } from '../Services/bookservice.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  bookslist:any;
  PageSize:number = 10;
  Bookmodel: BooksModel = new BooksModel();

  @Output () PageSizeEvent = new EventEmitter<any>();

  constructor(public dialog: MatDialog, public serviceobj: BookserviceService) {}

  ngOnInit(): void {
  }

  ShowModal(){    
    const dialogRef = this.dialog.open(ModalformComponent,{
      height: '450px',
      width: '600px',
    });
  }

}
