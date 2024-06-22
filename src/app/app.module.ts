import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [AppComponent, ToolBarComponent, FooterComponent, InscriptionComponent, ConnexionComponent, AproposComponent, MatiereComponent, OffresComponent, AccueilComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ bootstrapCart3 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
