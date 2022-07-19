import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  BaseURl : string = "http://localhost:54371/api/NewBooks/";

  constructor(private http: HttpClient) { }

  public Books(){
    return this.http.get((this.BaseURl) + "Books");
  }

  public Booksearch(searchdata:any){
    debugger;
    console.log(searchdata);
    return this.http.post(this.BaseURl + "Booksearch",searchdata);    
  }
}
