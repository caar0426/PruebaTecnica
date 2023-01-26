import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MonedaGetVM } from '../models/moneda/monedagetvm.model';
import { SucursalGetVM } from '../models/sucursal/sucursalgetvm.model ';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SucursalResponse } from '../models/sucursal/sucursalresponse.model';
import { SucursalCreateVM } from '../models/sucursal/sucursalcreatevm.model';
import { SucursalCreateResponse } from '../models/sucursal/sucursalcreateresponse.model';
import { SucursalUpdateResponse } from '../models/sucursal/sucursalupdateresponse.model';
import { SucursalUpdateVm } from '../models/sucursal/sucursalupdatevm.model';
import { SucursalDeleteResponse } from '../models/sucursal/sucursaldeleteresponse.model';


@Injectable({
    providedIn: 'root'
  })
  export class SucursalService {
    private baseUrl = 'https://localhost:44342';

    constructor(private http: HttpClient, private router: Router) { 
        
      }

      getSucursalesFull() {
        
        var rta = this.http.get<SucursalResponse>(`${this.baseUrl}/api/Sucursal`)
        .pipe(
          catchError(error => {
            if (error.status === 401) {
              this.router.navigate(['error']);
              return of(null);
            } else {
              throw error;
            }
          })
        );
        return rta;
      }

      getSucursalesById(id:string) {
        
        var rta = this.http.get<SucursalUpdateResponse>(`${this.baseUrl}/api/Sucursal/${id}`)
        .pipe(
          catchError(error => {
            if (error.status === 401) {
              this.router.navigate(['error']);
              return of(null);
            } else {
              throw error;
            }
          })
        );
        return rta;
      }

      createSucursal(sucursal: SucursalCreateVM) {
        const headers = new HttpHeaders({
          'accept': 'text/plain',
          'Content-Type': 'application/json'
        });
        
        return this.http.post<SucursalCreateResponse>(`${this.baseUrl}/api/Sucursal`, sucursal, { headers })
        .pipe(
          catchError(error => {
            if (error.status >=400) {
              this.router.navigate(['error']);
              return of(null);
            } else {
              throw error;
            }
          })
        );
      }

      updateSucursal(sucursal: SucursalUpdateVm) {
        const headers = new HttpHeaders({
            'accept': 'text/plain',
            'Content-Type': 'application/json'
        });
        return this.http.put<SucursalUpdateResponse>(`${this.baseUrl}/api/Sucursal/${sucursal.id}`, sucursal, { headers })
        .pipe(
            catchError(error => {
                if (error.status >= 400) {
                    this.router.navigate(['error']);
                    return of(null);
                } else {
                    throw error;
                }
            })
        );
    }


      deleteSucursal(id: number) {
        return this.http.delete<SucursalDeleteResponse>(`${this.baseUrl}/api/Sucursal/${id}`)
        .pipe(
          catchError(error => {
            if (error.status === 401) {
              this.router.navigate(['error']);
              return of(null);
            } else {
              throw error;
            }
          })
        );
      }
  }