import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { SucursalGetVM } from 'src/app/models/sucursal/sucursalgetvm.model ';
import { SucursalResponse } from 'src/app/models/sucursal/sucursalresponse.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service ';

@Component({
  selector: 'app-sucursal-list',
  templateUrl: './sucursal-list.component.html',
  styleUrls: ['./sucursal-list.component.css']
})
export class SucursalListComponent {
  sucursales!: SucursalGetVM[] | null;
  parametro: any;
  constructor(private sucursalService: SucursalService
    ,private spinnerService: SpinnerService
    , private router: Router
    ,private modalRef: BsModalRef
    ,private modalService: BsModalService
    ,private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.spinnerService.show();
    this.sucursalService.getSucursalesFull().subscribe(data  => {
      if(data && data.success)
      {
        this.sucursales = data.sucursales;
        this.spinnerService.hide();
      }
    });
  }

  goToEdit(id: number) {
    this.spinnerService.show();
    this.router.navigate(['sucursal/edit', id]);
  }

  goToOpenModal(template: TemplateRef<any>,parametro: any)
  {
    this.spinnerService.show();
    this.parametro = parametro  
    this.modalRef = this.modalService.show(template);
    this.spinnerService.hide();
  }

  deleteSucursal(id: number) {
    this.spinnerService.show();
    
    this.sucursalService.deleteSucursal(id).subscribe(data => {
      if(data && data.success)
      {

        this.ngOnInit();
        this.goToCloseModal();
        this.spinnerService.hide();
      }
    }, error => {
      this.spinnerService.show();
      console.log(error);
      this.spinnerService.hide();
    });
  }

  goToCloseModal()
  {
    this.spinnerService.show();
    this.modalRef.hide();
    this.spinnerService.hide();
  }

  goToCreate() {
    this.spinnerService.show();
    this.router.navigate(['sucursal/create']);

  }

  goToRefresh() {
  this.spinnerService.show();
    this.sucursalService.getSucursalesFull().subscribe(data  => {
      if(data && data.success)
      {
        this.sucursales = data.sucursales;
        this.changeDetectorRef.detectChanges();
        this.spinnerService.hide();
      }
    });
  }
}
