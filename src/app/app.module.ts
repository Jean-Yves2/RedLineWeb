import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapCart3 } from '@ng-icons/bootstrap-icons';

@NgModule({
  declarations: [AppComponent, ToolBarComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ bootstrapCart3 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
