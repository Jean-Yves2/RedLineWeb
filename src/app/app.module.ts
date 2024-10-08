import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapCart3 } from '@ng-icons/bootstrap-icons';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { MatiereComponent } from './components/matiere/matiere.component';
import { OffresComponent } from './components/offres/offres.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { PieceConfigurationComponent } from './components/piece-configuration/piece-configuration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormeMatiereComponent } from './components/forme-matiere/forme-matiere.component';
import { ProductComponent } from './components/product/product.component';
import { CommercialServiceComponent } from './components/commercial-service/commercial-service.component';
import { ApprovisionnementComponent } from './components/approvisionnement/approvisionnement.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { PanierComponent } from './components/panier/panier.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DossierClientComponent } from './components/dossier-client/dossier-client.component';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DevisComponent } from './components/devis/devis.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    FooterComponent,
    InscriptionComponent,
    ConnexionComponent,
    AproposComponent,
    MatiereComponent,
    OffresComponent,
    AccueilComponent,
    PieceConfigurationComponent,
    FormeMatiereComponent,
    ProductComponent,
    CommercialServiceComponent,
    ApprovisionnementComponent,
    FavoriteComponent,
    PanierComponent,
    NotFoundComponent,
    DossierClientComponent,
    DevisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgIconsModule.withIcons({ bootstrapCart3 }),
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
