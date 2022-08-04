import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookserviceService {

  BaseURl: string = 'http://localhost:54371/api/NewBooks/';

  constructor(private http: HttpClient) {}

  public Books() {
    return this.http.get(this.BaseURl + 'Books');
  }

  public Booksearch(searchformdata: any) {
    debugger;
    // console.log(searchformdata);
    return this.http.post(this.BaseURl + 'Booksearch', searchformdata);
  }

  public BookInsert(Id:any){
    debugger;
    return this.http.get(this.BaseURl + 'BookInsert?Id=' + Id);
  }

  public BookInsertPost(insertdata:any){
    debugger;
    return this.http.post(this.BaseURl + 'BookInsertPost', insertdata);
  }

  public Delete(deletedata:any){
    debugger;
    return this.http.post(this.BaseURl + 'Delete', deletedata);
  }
}