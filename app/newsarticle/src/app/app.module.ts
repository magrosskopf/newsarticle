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

@NgModule({
  declarations: [
    AppComponent,
    NewsfeedComponent,
    NewscardComponent,
    HeaderComponent,
    NavbarComponent,
    SettingsComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
