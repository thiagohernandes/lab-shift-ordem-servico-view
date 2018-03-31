import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IOrdemServico } from '../interfaces/ordem-servico';

@Injectable()
export class OrdemServicosService {

  private _ordens_servico:Array<Object>;
  private _url_base:string = "http://localhost:8080/api/ordens-servico";

  constructor(private http:HttpClient, private router: Router) { 
  }

  consultaOrdemServico(parametros,pageLimit,pageNumber):Observable<IOrdemServico[]>{
    return this.http.get<IOrdemServico[]>(this._url_base+'/consulta/'+pageLimit+'/'+pageNumber,{params:parametros})
                    .catch(this._errorHandler);
  }

  getOrdemServico(id):Observable<IOrdemServico[]>{
    return this.http.get<IOrdemServico[]>(this._url_base+'/'+id)
                    .catch(this._errorHandler);
  }

  salvarOrdemServico(ordemServico){ 
    return this.http.post(this._url_base+'/nova', ordemServico)
    .catch(this._errorHandler)
    .subscribe(res => {this.router.navigate(['/consulta-ordens-servico']);}); 
  }

  alterarOrdemServico(id,ordemServico){ 
    return this.http.put(this._url_base+'/alterar/'+id, ordemServico)
    .catch(this._errorHandler)
    .subscribe(res => {this.router.navigate(['/consulta-ordens-servico']);}); 
  }

  apagarOrdemServico(id) {
    return this.http.delete('http://localhost:8080/api/ordens-servico/apagar/'+id)
    .catch(this._errorHandler)
    .subscribe(res => {console.log(res)}); 
  }

  _errorHandler(error:HttpErrorResponse){
      return Observable.throw(error.message || "Server Error");
  }

}