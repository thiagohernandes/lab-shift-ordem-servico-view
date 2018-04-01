import { Component, OnInit } from '@angular/core';
import { OrdemServicosService } from '../servicos/ordem-servicos.service';
import { Params } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MedicoService } from '../servicos/medico.service';
import { reject } from 'q';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consulta-ordem-servico',
  templateUrl: './consulta-ordem-servico.component.html',
  styleUrls: ['./consulta-ordem-servico.component.css']
})
export class ConsultaOrdemServicoComponent implements OnInit {

  public ordensServico = [];
  public medicos = [];
  public msgErro = [];
  public params = new HttpParams();
  public pageLimit:number = 10;
  public pageNumber:number = 0;
  public habilitarNext = false;
  public habilitarForward = false;
  public currentOrdemServico:Object = {};
  public parametrosConsulta = {
        dataInicial: null,
        dataFinal: null,
        nomePaciente: null,
        nomeConvenio: null,
        nomePostoColeta: null,
        nomeMedico: null,
        nomeEspecialidade: null
  };
  public msg:string = null;

  constructor(private _ordemServicoService:OrdemServicosService, 
              private _medicoService:MedicoService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() { 
    if(this.route.snapshot.params['msg'] != null && this.route.snapshot.params['msg'] != undefined){
      this.msg = this.route.snapshot.params['msg'];
    }
  }

  consultarOrdensServico(tipo){ 
    if(this.parametrosConsulta.dataInicial == null || this.parametrosConsulta.dataFinal == null){
      this.msgErro.push('As datas são obrigatórias!');
      return;
    } else {
      this.msgErro = [];
    }
    this.consultaPaginada(tipo);
  }

  consultaPaginada(tipo){
    this.msg = null;
    this.params = new HttpParams({
      fromObject: {
        dataInicial: this.parametrosConsulta.dataInicial,
        dataFinal: this.parametrosConsulta.dataFinal,
        nomePaciente: this.parametrosConsulta.nomePaciente == null ? "" : this.parametrosConsulta.nomePaciente,
        nomeConvenio: this.parametrosConsulta.nomeConvenio == null ? "" : this.parametrosConsulta.nomeConvenio,
        nomePostoColeta: this.parametrosConsulta.nomePostoColeta == null ? "" : this.parametrosConsulta.nomePostoColeta,
        nomeMedico: this.parametrosConsulta.nomeMedico == null ? "" : this.parametrosConsulta.nomeMedico,
        nomeEspecialidade: this.parametrosConsulta.nomeEspecialidade == null ? "" : this.parametrosConsulta.nomeEspecialidade
      }});
      if(tipo == 'next'){
        this.pageNumber = this.pageNumber + 10;
        this._ordemServicoService.consultaOrdemServico(this.params,this.pageLimit,this.pageNumber)
        .subscribe(data => {this.ordensServico = data; this.controlePaginacao(this.pageNumber,this.ordensServico.length);},
                    error => this.msgErro.push(error));
      } else if(tipo == 'default'){
        this.pageNumber = 0;
        this._ordemServicoService.consultaOrdemServico(this.params,this.pageLimit,0)
        .subscribe(data => {this.ordensServico = data; this.controlePaginacao(0,this.ordensServico.length);},
                    error => this.msgErro.push(error));
      } else if(tipo == 'forward'){
          if(this.pageNumber > 0){
            this.pageNumber = this.pageNumber - 10;
            this._ordemServicoService.consultaOrdemServico(this.params,this.pageLimit,this.pageNumber)
            .subscribe(data => {this.ordensServico = data;this.controlePaginacao(this.pageNumber,this.ordensServico.length); },
                        error => this.msgErro.push(error));
          }
      } 
  }

  controlePaginacao(pageNumber,listaOrdensServicoLength){ 
      if(pageNumber == 0 && listaOrdensServicoLength == 10){
        this.habilitarNext = true;
        this.habilitarForward = false;
      }
      if(pageNumber == 0 && listaOrdensServicoLength < 10){
        this.habilitarNext = false;
        this.habilitarForward = false;
      }
      if(pageNumber > 0 && listaOrdensServicoLength == 10){
        this.habilitarNext = true;
        this.habilitarForward = true;
      }
      if(pageNumber > 0 && listaOrdensServicoLength < 10){
        this.habilitarNext = false;
        this.habilitarForward = true;
      }
  }

  apagarOrdemServico(id){
    this._ordemServicoService.apagarOrdemServico(id);
    for(var x =0; x < this.ordensServico.length; x++){
      if(this.ordensServico[x].numeroOrdemServico == id){
        this.ordensServico.splice(x,1);
        this.msg = 'Sucesso na exclusão';
      }
    }
  }

  setCurrentOrdemServico(os){
    this.currentOrdemServico = os;
  }


}
