import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { MatiereComponent } from './components/matiere/matiere.component';
import { OffresComponent } from './components/offres/offres.component';
import { AccueilComponent } from './components/accueil/accueil.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'apropos', component: AproposComponent },
  { path: 'matiere', component: MatiereComponent },
  { path: 'offres', component: OffresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
