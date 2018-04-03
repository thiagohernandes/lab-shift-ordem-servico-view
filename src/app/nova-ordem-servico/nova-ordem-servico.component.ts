import { Component, OnInit } from '@angular/core';
import { OrdemServicosService } from '../servicos/ordem-servicos.service';
import { PacienteService } from '../servicos/paciente.service';
import { PostoColetaService } from '../servicos/posto-coleta.service';
import { MedicoService } from '../servicos/medico.service';
import { ConvenioService } from '../servicos/convenio.service';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nova-ordem-servico',
  templateUrl: './nova-ordem-servico.component.html',
  styleUrls: ['./nova-ordem-servico.component.css']
})
export class NovaOrdemServicoComponent implements OnInit {

  public pacientes = [];
  public convenios = [];
  public postosColeta = [];
  public medicos = [];
  public msgsErros = null;
  public sucesso = false;
  private alterando = false;

  public dadosOrdemServico = {
    data: null,
    paciente: {},
    convenio: {},
    postoColeta: {},
    medico: {},
    nomePaciente: ''
  };

  public currentConvenio = { id: null, nome: ''};
  public currentPaciente = { id: null, nome: null};
  public currentPostoColeta = { id: null};
  public currentMedico = { id: null};
  public currentCodigoOrdemServico = null;

  public parametroNomeInvalido = false;
  public ordemServicoAlterar = {id_medico: null, id_convenio: null, id_paciente: null, id_posto_coleta: null};

constructor(private _ordemServicoService:OrdemServicosService,
            private _pacienteService:PacienteService,
            private _convenioService:ConvenioService,
            private _postoColetaService:PostoColetaService,
            private _medicoService:MedicoService,
            private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.msgsErros = [];
    this.sucesso = false;
    this._medicoService.consultaMedicos()
                       .subscribe(data => this.medicos = data,
                       error => this.msgsErros.push[error+' - consultaMedicos']);
    this._postoColetaService.consultaPostosColeta()
                       .subscribe(data => this.postosColeta = data,
                       error => this.msgsErros.push[error+' - consultaPostosColeta']);
    this._convenioService.consultaConvenios()
                       .subscribe(data => this.convenios = data,
                       error => this.msgsErros.push[error+' - consultaConvenios']);
   
    if(this.route.snapshot.params['id'] != null && this.route.snapshot.params['id'] != undefined){
      this.alterando = true;
      this.getOrdemServico(parseInt(this.route.snapshot.params['id']));
    }
  }

  getOrdemServico(id){ 
    this._ordemServicoService.getOrdemServico(id)
    .subscribe(res => { 
            this.dadosOrdemServico.data = this.formatarDataYYYYMMDD(res.data);
            this.currentConvenio.id = res.convenio.id;
            this.currentPostoColeta.id = res.postoColeta.id;
            this.currentMedico.id = res.medico.id;
            this.currentPaciente.id = res.paciente.id;
            this.currentPaciente.nome = res.paciente.nome;
            this.currentCodigoOrdemServico = res.id;
            setTimeout(() => { 
              this.setarValorConvenioSelect(res.convenio.id);
              this.setarValorMedicoSelect(res.medico.id);
              this.setarValorPostoColetaSelect(res.postoColeta.id);
            }, 50);
            },
            error => this.msgsErros.push(error));
    
  }

  formatarDataYYYYMMDD(data){ 
    let dFormat = new Date(data);
    let dd = dFormat.getDate();
    let mm = dFormat.getMonth()+1;     
    let yyyy = dFormat.getFullYear();
    let ddS:string;
    let mmS:string;
    if(dd<10){
      ddS ='0'+dd;
    } else {
      ddS = dd.toString();
    }
    if(mm<10){
      mmS ='0'+mm;
    } else{
      mmS = mmS.toString();
    }
    return yyyy+'-'+mmS+'-'+ddS;
  }

  salvarOrdemServico(){  
    if(this.montarDados()){ 
      if(!this.alterando){
        this._ordemServicoService.salvarOrdemServico(this.dadosOrdemServico);
      } else {
        this._ordemServicoService.alterarOrdemServico(this.currentCodigoOrdemServico,this.dadosOrdemServico);
      }
    }
  }

  montarDados(){ 
    this.msgsErros = [];    
    if(this.currentConvenio.id == null || this.currentMedico.id == null || this.currentPaciente.id == null
      || this.currentPostoColeta.id == null || this.dadosOrdemServico.data == null){
        this.msgsErros.push("Todos os campos são obrigatórios");
      return false;
    } else {
      this.dadosOrdemServico.convenio = this.currentConvenio;
      this.dadosOrdemServico.postoColeta = this.currentPostoColeta;
      this.dadosOrdemServico.medico = this.currentMedico;
      this.dadosOrdemServico.paciente = this.currentPaciente;
      return true;
    }
  }

  consultarPacientes(nome){
    if(nome == null || nome == undefined || nome == ''){
      this.parametroNomeInvalido = true;
      return;
    } else {
      this.parametroNomeInvalido = false;
      this._pacienteService.consultaPacientes(nome)
      .subscribe(data => this.pacientes = data,
      error => this.msgsErros.push[error+' - consultaPacientes']);
    }
  }

  setarValorConvenioSelect(id){ 
    for (var i = 0; i < this.convenios.length; i++){
      if (this.convenios[i].id == id) {  
     let selectConvenioLet = (document.getElementById("selectConvenio") as HTMLSelectElement);
     selectConvenioLet.options[0].innerHTML = this.convenios[i].id+' - '+this.convenios[i].nome;
     this.currentConvenio.id = this.convenios[i].id;
        this.currentConvenio.nome = this.convenios[i].nome;
        this.convenios.splice(i,1);
        break;
      }
    }
  }

  onSelectConvenio(id) { 
    if(id == 'Selecione'){
      this.currentConvenio.id = null;
      return;
    }
    for (var i = 0; i < this.convenios.length; i++){
      if (this.convenios[i].id == id) {
        this.currentConvenio.id = this.convenios[i].id;
        break;
      }
    }
  }

  setarValorPostoColetaSelect(id){
    for (var i = 0; i < this.postosColeta.length; i++){
      if (this.postosColeta[i].codigoPostoColeta == id) { 
        let selectPostoColetaLet = (document.getElementById("selectPostoColeta") as HTMLSelectElement);
        selectPostoColetaLet.options[0].innerHTML = 
        this.postosColeta[i].codigoPostoColeta+' - '+this.postosColeta[i].nomePostoColeta+' - '+this.postosColeta[i].localidadePostoColeta;
        this.currentPostoColeta.id = this.postosColeta[i].codigoPostoColeta;
        this.postosColeta.splice(i,1);
        break;
      }
    }
  } 

  onSelectPostoColeta(id) { 
    if(id == 'Selecione'){
      this.currentPostoColeta.id = null;
      return;
    }
    for (var i = 0; i < this.postosColeta.length; i++){
      if (this.postosColeta[i].codigoPostoColeta == id) {
        this.currentPostoColeta.id = this.postosColeta[i].codigoPostoColeta;
        break;
      }
    }
  }

  setarValorMedicoSelect(id){
    for (var i = 0; i < this.medicos.length; i++){
      if (this.medicos[i].codigoMedico == id) { 
        let selectMedicoLet = (document.getElementById("selectMedico") as HTMLSelectElement); 
        selectMedicoLet.options[0].innerHTML = this.medicos[i].codigoMedico+' - '+this.medicos[i].nomeMedico+' - '+this.medicos[i].especialidadeMedico;
        this.currentMedico.id = this.medicos[i].codigoMedico;
        this.medicos.splice(i,1);
        break;
      }
    }
  } 

  onSelectMedico(id) { 
    if(id == 'Selecione'){
      this.currentMedico.id = null;
      return;
    }
    for (var i = 0; i < this.medicos.length; i++){
      if (this.medicos[i].codigoMedico == id) {
        this.currentMedico.id = this.medicos[i].codigoMedico;
        break;
      }
    }
  }

  onSelectPaciente(id) {  
    this.currentPaciente.id = id;
    for (var i = 0; i < this.pacientes.length; i++){
      if (this.pacientes[i].codigoPaciente == id) {
        this.currentPaciente.id = this.pacientes[i].codigoPaciente;
        this.currentPaciente.nome = this.pacientes[i].nomePaciente;
      }
    }
  }

}
