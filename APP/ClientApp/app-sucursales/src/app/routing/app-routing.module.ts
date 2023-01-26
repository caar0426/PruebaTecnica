import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../components/error/error.component';
import { SucursalCreateComponent } from '../components/sucursal-create/sucursal-create.component';
import { SucursalListComponent } from '../components/sucursal-list/sucursal-list.component';
import { SucursalUpdateComponent } from '../components/sucursal-update/sucursal-update.component';


const routes: Routes = [
  { path: '', component: SucursalListComponent},
  { path: 'sucursal/create', component: SucursalCreateComponent},
  { path: 'sucursal/list', component: SucursalListComponent},
  { path: 'sucursal/edit/:id', component: SucursalUpdateComponent},
  { path: 'error', component: ErrorComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
