import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MonedaService } from 'src/app/services/moneda.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { MonedaGetVM } from 'src/app/models/moneda/monedagetvm.model';
import { SpinnerService } from 'src/app/services/spinner.service ';

@Component({
  selector: 'app-sucursal-create',
  templateUrl: './sucursal-create.component.html',
  styleUrls: ['./sucursal-create.component.css']
})
export class SucursalCreateComponent {
  formularioCrear!: FormGroup;
  tipoMoneda!: MonedaGetVM[] | null;
  monedaIdControl: any;

  constructor(private spinnerService: SpinnerService
    ,private formBuilder: FormBuilder, private router: Router, private monedaService: MonedaService, private sucursalService: SucursalService) { 

    this.formularioCrear = this.formBuilder.group({
      codigo: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      identificacion: ['', Validators.required],
      fechaCreacion: ['', [Validators.required,Validators.min(new Date().getTime())]],
      monedaId: ['', Validators.required]
    });
    

  }

  ngOnInit() {
    this.spinnerService.show();
    this.monedaService.getTiposMoneda().subscribe(tiposMoneda =>
      {
        if(tiposMoneda && tiposMoneda.success)
        {
          this.tipoMoneda = tiposMoneda.monedas;
          this.monedaIdControl = this.formularioCrear.get('monedaId');
      this.monedaIdControl.valueChanges.subscribe((value: any) => {
        console.log(value); // value is the selected id
      });

        }
        this.spinnerService.hide();
      });
      
  }

  onSubmit() {
    this.spinnerService.show();
    const sucursal = this.formularioCrear.value;
    sucursal.monedaId = this.monedaIdControl.value;
    this.sucursalService.createSucursal(sucursal)
      .subscribe(data => {
        
        if(data && data.success)
        {
          this.router.navigate(['sucursal/list']);
        }else{
          this.router.navigate(['error']);
        }
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  goToList() {
    this.spinnerService.show();
    this.router.navigate(['sucursal/list']);
  }

}
