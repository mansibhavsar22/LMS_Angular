import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookserviceService } from '../Services/bookservice.service';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.css'],
})
export class DeletemodalComponent implements OnInit {
  BookId: any;
  title: any;
  BookName: any;
  booklist: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serviceobj: BookserviceService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeletemodalComponent>
  ) {}

  ngOnInit(): void {
    this.getdata();
    this.title = this.data.title;
  }

  getdata() {
    this.serviceobj.BookInsert(this.data.Id).subscribe((data: any) => {
      this.BookId = data.BookId;
      this.BookName = data.BookName;
    });
  }

  ondelete(deletedata: any) {
    this.serviceobj.Delete(deletedata).subscribe((data: any) => {
      this.booklist = data.booklist;
    });
    this.toastr.success('Deleted Successfully', 'Delete', {
      timeOut: 3000,
    });
  }

  close() {
    this.dialog.close();
  }
}
