import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { LivreursComponent } from './livreurs/livreurs.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'statistiques', pathMatch: 'full' },
      { path: 'clients', component: ClientsComponent },
      { path: 'livreurs', component: LivreursComponent },
      { path: 'commandes', component: CommandesComponent },
      { path: 'statistiques', component: StatistiquesComponent },
      { path: 'reclamations', component: ReclamationsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
