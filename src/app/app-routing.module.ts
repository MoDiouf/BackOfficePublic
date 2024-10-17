import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HandlePageComponent } from './pages/home/handle-page/handle-page.component';
import { InscriptionComponent } from './pages/login/inscription/inscription.component';
import { SigoutComponent } from './pages/login/sigout/sigout.component';
import { HomePagesComponent } from './pages/home/home-pages/home-pages.component';
import { FooterPageComponent } from './pages/home/footer-page/footer-page.component';
import { ContactComponent } from './contact/contact.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { GestionProjetsComponent } from './pages/home/gestion-projets/gestion-projets.component';
import { ProfilComponent } from './pages/home/profil/profil.component';
import { PageNotFoundComponent } from './pages/home/page-not-found/page-not-found.component';

const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: '/Connexion' },
  { path: 'login', component: LoginComponent },
  {path:"Handle",component:HandlePageComponent},
  {path:"Inscription",component:InscriptionComponent},
  {path:"SigOut",component:SigoutComponent},
  {path:"Home",component:HomePagesComponent},
  {path:"Footer",component:FooterPageComponent},
  {path:"Contact",component:ContactComponent},
  {path:"Connexion",component:ConnexionComponent},
  {path:"GestionProjet",component:GestionProjetsComponent},
  {path:"ProfilPage",component:ProfilComponent},
  // {path:"**",component:PageNotFoundComponent},
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
