import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { NzZorroAntdModule } from 'src/app/NzZorroAntdModule';
import { ClientsComponent } from './clients/clients.component';
import { LivreursComponent } from './livreurs/livreurs.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterPageComponent } from '../home/footer-page/footer-page.component';


@NgModule({
  imports: [DashboardRoutingModule, NzZorroAntdModule, FormsModule, ReactiveFormsModule, CommonModule,FooterPageComponent],
  declarations: [DashboardComponent, ClientsComponent, LivreursComponent, CommandesComponent, ReclamationsComponent, StatistiquesComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }
