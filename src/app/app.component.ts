import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Library Management';
  bookslist: any;
  
  constructor(private serviceobj : AppService){
    this.serviceobj.Books().subscribe(data=>{
    debugger;
      
      this.bookslist =(data)});
  }
}
