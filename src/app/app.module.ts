import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ngModule
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ConsultaOrdemServicoComponent } from './consulta-ordem-servico/consulta-ordem-servico.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NovaOrdemServicoComponent } from './nova-ordem-servico/nova-ordem-servico.component';

import { OrdemServicosService } from './servicos/ordem-servicos.service';
import { MedicoService } from './servicos/medico.service';
import { PostoColetaService } from './servicos/posto-coleta.service';
import { ConvenioService } from './servicos/convenio.service';
import { PacienteService } from './servicos/paciente.service';
import { HttpErrorHandlerComponent } from './http-error-handler/http-error-handler.component';

// *******************************
// Rotas da Aplicação
// *******************************
const appRoutes: Routes = [
  { path: '', redirectTo: 'consulta-ordens-servico', pathMatch: 'full' },
  { path: 'consulta-ordens-servico', component: ConsultaOrdemServicoComponent },
  { path: 'consulta-ordens-servico/:msg', component: ConsultaOrdemServicoComponent },
  { path: 'nova-ordem-servico', component: NovaOrdemServicoComponent },
  { path: 'error-http-methods/:msg', component: HttpErrorHandlerComponent },
  { path: 'ordem-servico-edicao/:id', component: NovaOrdemServicoComponent },
  { path: '**', component: PageNotFoundComponent }  
];

@NgModule({
  declarations: [
    AppComponent,
    ConsultaOrdemServicoComponent,
    PageNotFoundComponent,
    NovaOrdemServicoComponent,
    HttpErrorHandlerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    OrdemServicosService,
    PostoColetaService,
    MedicoService,
    ConvenioService,
    PacienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
