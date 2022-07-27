import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookserviceService } from '../Services/bookservice.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent implements OnInit {
  categorylist: any;
  publisherlist: any;
  Id: any;
  BookName: any;
  IsActive: any;

  constructor(
    public serviceobj: BookserviceService,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {
    debugger;
    this.Id=this._Activatedroute.snapshot.params['Id'];
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log(params);
      this.Id = params.get('Id');
    });
    this.getlist();
  }

  sub: any;
  ngOnInit(): void {
    debugger;
    //this.Id=this._Activatedroute.snapshot.params['Id'];
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log(params);
      this.Id = params.get('Id');
    });
  }

  onSave(insertdata: any) {
    this.serviceobj.BookInsertPost(insertdata).subscribe(() => {});
    alert('Saved Successfully');
  }

  Cancel() {
    this.router.navigateByUrl('/search');
  }

  getlist() {
    this.serviceobj.BookInsert(this.Id).subscribe((data: any) => {
      debugger;
      this.BookName = data.BookName;
      this.categorylist = data.categorieslist;
      this.publisherlist = data.publisherslist;
      this.IsActive = data.IsActive;
    });
  }
}
