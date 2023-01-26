import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MonedaService } from 'src/app/services/moneda.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { MonedaGetVM } from 'src/app/models/moneda/monedagetvm.model';
import { SpinnerService } from 'src/app/services/spinner.service ';

@Component({
  selector: 'app-sucursal-update',
  templateUrl: './sucursal-update.component.html',
  styleUrls: ['./sucursal-update.component.css']
})
export class SucursalUpdateComponent {
  formularioModificar!: FormGroup;
  tipoMoneda!: MonedaGetVM[] | null;
  monedaIdControl: any;

  constructor(private route: ActivatedRoute
    , private spinnerService: SpinnerService
    , private formBuilder: FormBuilder, private router: Router, private monedaService: MonedaService, private sucursalService: SucursalService) {

    this.formularioModificar = this.formBuilder.group({
      id: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      identificacion: ['', Validators.required],
      fechaCreacion: ['', [Validators.required, Validators.min(new Date().getTime())]],
      monedaId: ['', Validators.required]
    });


  }

  ngOnInit() {
    this.spinnerService.show();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sucursalService.getSucursalesById(id)
        .subscribe(data => {
          if (data && data.sucursal && data.success) {
            this.formularioModificar.setValue({
              id: data.sucursal.id,
              codigo: data.sucursal.codigo,
              descripcion: data.sucursal.descripcion,
              direccion: data.sucursal.direccion,
              identificacion: data.sucursal.identificacion,
              fechaCreacion: data.sucursal.fechaCreacionString,
              monedaId: data.sucursal.monedaId
            });
            this.spinnerService.hide();
          } else {
            this.spinnerService.show();
            this.router.navigate(['error']);
          }

        }, error => {
          this.spinnerService.show();
          console.log(error);
          this.spinnerService.hide();
        });
    } else {
      this.spinnerService.show();
      this.router.navigate(['error']);
    }
    this.spinnerService.show();
    this.monedaService.getTiposMoneda().subscribe(tiposMoneda => {
      if (tiposMoneda && tiposMoneda.success) {
        this.tipoMoneda = tiposMoneda.monedas;
        this.monedaIdControl = this.formularioModificar.get('monedaId');
        this.monedaIdControl.valueChanges.subscribe((value: any) => {
          console.log(value); // value is the selected id
        });
      }
      this.spinnerService.hide();
    });
  }


  onSubmit() {
    this.spinnerService.show();
    const sucursal = this.formularioModificar.value;
    sucursal.monedaId = this.monedaIdControl.value;
    this.sucursalService.updateSucursal(sucursal)
      .subscribe(data => {
        if (data && data.success) {
          this.router.navigate(['sucursal/list']);
        } else {
          this.router.navigate(['error']);
        }
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.show();
        console.log(error);
        this.spinnerService.hide();
      });
  }

  goToList() {
    this.spinnerService.show();
    this.router.navigate(['sucursal/list']);
  }
}

