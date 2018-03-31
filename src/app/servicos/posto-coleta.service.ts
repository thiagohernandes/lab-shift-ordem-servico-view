import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IPostoColeta } from '../interfaces/posto-coleta';

@Injectable()
export class PostoColetaService {

  private _medicos:Array<Object>;
  private _url_base:string = "http://localhost:8080/api/postos-coleta";

  constructor(private http:HttpClient, private router: Router) { 
  }

  consultaPostosColeta():Observable<IPostoColeta[]>{
    return this.http.get<IPostoColeta[]>(this._url_base+'/consulta')
                    .catch(this._errorHandler);
  }

  _errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
}

}
