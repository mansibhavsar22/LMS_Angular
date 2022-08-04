import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookserviceService } from '../Services/bookservice.service';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $ : any;

@Component({
  selector: 'app-modalform',
  templateUrl: './modalform.component.html',
  styleUrls: ['./modalform.component.css']
})
export class ModalformComponent implements OnInit {
  booklist:any;
  categorylist: any;
  publisherlist: any;
  PageNumber: any = 1;
  PageSize: any;
  BookName:any;
  CategoryId:any;
  PublisherId:any;
  BookId:any;
  title:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public serviceobj: BookserviceService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<ModalformComponent>) { 
  }

  ngOnInit(): void {
    console.log(this.data);
    this.getdetails();
    this.title = this.data.title;
  }

  getdetails(){
    this.serviceobj.BookInsert(this.data.Id).subscribe((data:any) => {
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
      this.BookId = data.BookId;
      this.BookName = data.BookName;
      this.CategoryId = data.CategoryId;
      this.PublisherId = data.PublisherId;
    })
  }

  onSave(insertdata: any) {
    this.serviceobj.BookInsertPost(insertdata).subscribe((data:any) => {
      this.booklist= data.booklist;
    });
    debugger;
    this.toastr.success('Saved Successfully', 'Saved', {
      timeOut: 3000,
    });
  }

  close(){
    this.dialog.close();
  }

}

