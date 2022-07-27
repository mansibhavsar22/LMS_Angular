import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookserviceService {
  //Pagination Variables
  temppage: number = 0;
  pageField: any =[];
  exactPageList: any;

  BaseURl: string = 'http://localhost:54371/api/NewBooks/';

  constructor(private http: HttpClient) {}

  public Books(PageNumber:any,PageSize:any) {
    return this.http.get(this.BaseURl + 'Books?PageNumber=' + PageNumber);
  }

  public Booksearch(searchdata: any) {
    console.log(searchdata);
    return this.http.post(this.BaseURl + 'Booksearch', searchdata);
  }

  public BookInsert(Id:any){
    debugger;
    return this.http.get(this.BaseURl + 'BookInsert?Id=' + Id);
  }

  public BookInsertPost(insertdata:any){
    debugger;
    return this.http.post(this.BaseURl + 'BookInsertPost', insertdata);
  }

  BookId:any;
  Id:any
  public Delete(){
    var a= {BookId:this.Id};
   // console.log(Id);
    debugger;
    return this.http.post(this.BaseURl + 'Delete?Id=', a);
  }

  pageOnLoad() {
    if (this.temppage == 0) {
      this.pageField = [];
      for (var a = 0; a < this.exactPageList; a++) {
        this.pageField[a] = this.temppage + 1;
        this.temppage = this.temppage + 1;
      }
    }
  }
}

