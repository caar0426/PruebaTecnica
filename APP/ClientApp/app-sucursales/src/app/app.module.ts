import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SucursalListComponent } from './components/sucursal-list/sucursal-list.component';
import { ErrorComponent } from './components/error/error.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { SucursalCreateComponent } from './components/sucursal-create/sucursal-create.component';
import { SucursalUpdateComponent } from './components/sucursal-update/sucursal-update.component';
import { ModalModule, BsModalRef  } from 'ngx-bootstrap/modal';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    SucursalListComponent,
    SucursalCreateComponent,
    SucursalUpdateComponent
    
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // NgxSpinnerModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
