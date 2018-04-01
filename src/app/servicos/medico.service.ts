import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IMedico } from '../interfaces/medico';

@Injectable()
export class MedicoService {

  private _medicos:Array<Object>;
  private _url_base:string = "http://localhost:8080/api/medicos";

  constructor(private http:HttpClient, private router: Router) { 
  }

  consultaMedicos():Observable<IMedico[]>{
    return this.http.get<IMedico[]>(this._url_base+'/todos')
                    .catch(this._errorHandler);
  }

  _errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }

}
