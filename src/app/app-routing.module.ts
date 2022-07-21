import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './addbook/addbook.component';
import { BooklistComponent } from './booklist/booklist.component';

const routes: Routes = [
  {
    path:"",
    component:BooklistComponent
  },
  {
    path:"addbook",
    component:AddbookComponent
  },
  {
    path:"booklist",
    component:BooklistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
