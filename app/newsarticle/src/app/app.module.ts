import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { NewscardComponent } from './elements/newscard/newscard.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';
import { ImpressumComponent } from './pages/impressum/impressum.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NewsfeedComponent,
    NewscardComponent,
    HeaderComponent,
    NavbarComponent,
    SettingsComponent,
    FaqComponent,
    ImpressumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
