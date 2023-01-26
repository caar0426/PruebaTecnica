import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MonedaGetVM } from '../models/moneda/monedagetvm.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MonedaResponse } from '../models/moneda/monedaresponse.model';

@Injectable({
    providedIn: 'root'
  })
  export class MonedaService {
    private baseUrl = 'https://localhost:44342';

    constructor(private http: HttpClient, private router: Router) { 
        
      }
    getTiposMoneda(): Observable<MonedaResponse | null> {
      return this.http.get<MonedaResponse>(this.baseUrl + '/api/Moneda')
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