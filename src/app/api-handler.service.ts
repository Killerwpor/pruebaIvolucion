import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http: HttpClient) { }

  
  private httpHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  
  private urlDepartment: string = "https://pruebasasivamosffiebackend.ivolucion.com/api/common/ListDepartamento";
  private urlDetail: string="https://pruebasasivamosffiebackend.ivolucion.com/api/common/ListMunicipiosByIdDepartamento?idDepartamento=";

  getDepartaments(): Observable<any> { 
      
        return this.http.get<any>(this.urlDepartment, {
          headers: this.httpHeaders 
        });    
  }

  getDepartmentDetail(data: String): Observable<any> { 
   
      
        return this.http.get<any>(this.urlDetail+data);    
  }



}
