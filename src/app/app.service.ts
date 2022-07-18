import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  BaseURl : string = "http://localhost:54371/api/NewBooks/";

  constructor(private http: HttpClient) { }

   public Books(){
    debugger;
    return this.http.get(this.BaseURl + "Books");
  }
}
