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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { WissenComponent } from './pages/wissen/wissen.component';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    NewsfeedComponent,
    NewscardComponent,
    HeaderComponent,
    NavbarComponent,
    SettingsComponent,
    FaqComponent,
    ImpressumComponent,
    WissenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
