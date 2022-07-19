import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';


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

  constructor(private serviceobj: AppService) {
    this.getlist();
  }

  getlist() {
    this.serviceobj.Books().subscribe((data: any) => {
      this.bookslist = data.bookslist;
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
    });
  }
  ngOnInit(): void {}

  onSumbit(searchdata: any){
    this.serviceobj.Booksearch(searchdata).subscribe((data: any) =>{
      this.bookslist = data.bookslist;
    });
    console.log(searchdata);
  }
}
