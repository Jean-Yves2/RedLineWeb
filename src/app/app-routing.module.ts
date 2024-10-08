import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { MatiereComponent } from './components/matiere/matiere.component';
import { OffresComponent } from './components/offres/offres.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { PieceConfigurationComponent } from './components/piece-configuration/piece-configuration.component';
import { FormeMatiereComponent } from './components/forme-matiere/forme-matiere.component';
import { ProductComponent } from './components/product/product.component';
import { CommercialServiceComponent } from './components/commercial-service/commercial-service.component';
import { ApprovisionnementComponent } from './components/approvisionnement/approvisionnement.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { PanierComponent } from './components/panier/panier.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
  },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'apropos', component: AproposComponent },
  {
    path: 'matiere',
    component: MatiereComponent,
  },
  { path: 'offres', component: OffresComponent },
  {
    path: 'piece-configuration',
    component: PieceConfigurationComponent,
  },
  {
    path: 'matiere/:category',
    component: FormeMatiereComponent,
  },
  {
    path: 'products/:id',
    component: ProductComponent,
  },
  {
    path: 'commercial',
    component: CommercialServiceComponent,
    canActivate: [RoleGuard],
    data: { roles: ['COMMERCIAL'] },
  },
  {
    path: 'approvisionnement',
    component: ApprovisionnementComponent,
    canActivate: [RoleGuard],
    data: { roles: ['SUPPLY_MANAGER'] },
  },
  {
    path: 'favoris',
    component: FavoriteComponent,
  },
  {
    path: 'panier',
    component: PanierComponent,
  },
  { path: '404', component: NotFoundComponent },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
