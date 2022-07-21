import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent implements OnInit {
  categorylist: any;
  publisherlist: any;

  constructor(public serviceobj: AppService, private router: Router) {
    this.getlist();
  }

  ngOnInit(): void {}

  onSave(insertdata: any) {
    this.serviceobj.BookInsertPost(insertdata).subscribe(() => {});
    alert("Saved Successfully");
  }

  Cancel() {
    this.router.navigateByUrl('/booklist');
  }

  getlist() {
    this.serviceobj.BookInsert().subscribe((data: any) => {
      debugger;
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
    });
  }
}
