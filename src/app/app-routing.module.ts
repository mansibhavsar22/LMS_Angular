import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './addbook/addbook.component';
import { BooklistComponent } from './booklist/booklist.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:"",
    component:SearchComponent
  },
  {
    path:"addbook/:Id",
    component:AddbookComponent
  },
  {
    path:"addbook",
    component:AddbookComponent
  },
  {
    path:"booklist",
    component:BooklistComponent
  },
  {
    path:"search",
    component:SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
