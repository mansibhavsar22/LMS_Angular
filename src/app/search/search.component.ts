import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalformComponent } from '../modalform/modalform.component';
import { BookserviceService } from '../Services/bookservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title = 'Library Management';
  categorylist: any;
  publisherlist: any;
  bookslist: any;
  PageNumber: any = 1;
  PageSize: any;

  constructor(
    public serviceobj: BookserviceService,
    private toastr : ToastrService,
    public dialog: MatDialog,
    private router: Router) { 
    // this.getlist();
  }

  ngOnInit(): void {
    this.getlist();
  }

  Delete(book: any) {
    this.serviceobj.Id= book.BookId;
    this.serviceobj.Delete().subscribe((data: any) => {
      debugger;
      this.getlist();
      this.toastr.warning('Deleted Successfully', 'Delete', {
        timeOut: 3000,
      });
    });
  }

  onSumbit(searchdata: any) {
    debugger;
    this.serviceobj.Booksearch(searchdata).subscribe((data: any) => {
      this.bookslist = data.bookslist;
    });
  }

  getlist() {
    this.serviceobj.Books(this.PageNumber, this.PageSize).subscribe((data: any) => {
      debugger;
      this.bookslist = data.bookslist;
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
    });
  }

  ShowModal(){    
    const dialogRef = this.dialog.open(ModalformComponent,{
      height: '450px',
      width: '600px',
    });
  }

  // AddComponent() {
  //   this.router.navigateByUrl('/addbook');
  // };
}
