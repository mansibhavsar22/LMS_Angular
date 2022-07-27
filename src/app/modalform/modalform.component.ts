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
  // form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public serviceobj: BookserviceService,
    private toastr: ToastrService,
    // private formBuilder: FormBuilder,
    public dialog: MatDialogRef<ModalformComponent>) { 
  }

  ngOnInit(): void {
    console.log(this.data);
    // this.form = this.formBuilder.group({
    //   BookName: [null, [Validators.required]],
    //   CategoryId: [null, Validators.required],
    //   PublisherId: [null, Validators.required],
    // });
    this.getdetails();
  }

  getlist() {
    this.serviceobj.Books(this.PageNumber, this.PageSize).subscribe((data: any) => {
      //debugger;
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
    });
  }

  getdetails(){
    this.serviceobj.BookInsert(this.data).subscribe((data:any) => {
      //debugger;
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
      this.BookId = data.BookId;
      this.BookName = data.BookName;
      this.CategoryId = data.CategoryId;
      this.PublisherId = data.PublisherId;
    })
  }

  onSave(insertdata: any) {
    //debugger;
    this.serviceobj.BookInsertPost(insertdata).subscribe((data:any) => {
      this.booklist= data.booklist;
    });
    debugger;
    this.toastr.success('Saved Successfully', 'Saved', {
      timeOut: 3000,
    });
    // alert('Saved Successfully');
  }

  close(){
    this.dialog.close();
  }

}

