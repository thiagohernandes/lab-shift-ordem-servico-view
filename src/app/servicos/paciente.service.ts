import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IPaciente } from '../interfaces/paciente';

@Injectable()
export class PacienteService {

  private _medicos:Array<Object>;
  private _url_base:string = "http://localhost:8080/api/pacientes";

  constructor(private http:HttpClient, private router: Router) { 
  }

  consultaPacientes(pNome):Observable<IPaciente[]>{
    return this.http.get<IPaciente[]>(this._url_base+'/consulta/'+pNome)
                    .catch(this._errorHandler);
  }

  _errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
}

}