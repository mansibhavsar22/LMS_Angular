import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooklistComponent } from './booklist/booklist.component';
import { AddbookComponent } from './addbook/addbook.component';
import { SearchComponent } from './search/search.component';
import { BookserviceService } from './Services/bookservice.service';
import { ModalformComponent } from './modalform/modalform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DeletemodalComponent } from './deletemodal/deletemodal.component';

@NgModule({
  declarations: [
    AppComponent,
    BooklistComponent,
    AddbookComponent,
    SearchComponent,
    ModalformComponent,
    DeletemodalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [BookserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
