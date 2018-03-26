import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ConsultaOrdemServicoComponent } from './consulta-ordem-servico/consulta-ordem-servico.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NovaOrdemServicoComponent } from './nova-ordem-servico/nova-ordem-servico.component';

import { OrdemServicosService } from './servicos/ordem-servicos.service';

// *******************************
// Rotas da Aplicação
// *******************************
const appRoutes: Routes = [
  { path: '', redirectTo: 'consulta-ordens-servico', pathMatch: 'full' },
  { path: 'consulta-ordens-servico', component: ConsultaOrdemServicoComponent },
  { path: 'nova-ordem-servico', component: NovaOrdemServicoComponent },
  { path: '**', component: PageNotFoundComponent }  
];

@NgModule({
  declarations: [
    AppComponent,
    ConsultaOrdemServicoComponent,
    PageNotFoundComponent,
    NovaOrdemServicoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    OrdemServicosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
