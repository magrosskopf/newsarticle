import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './pages/faq/faq.component';
import { ImpressumComponent } from './pages/impressum/impressum.component';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WissenComponent } from './pages/wissen/wissen.component';

const routes: Routes = [
  { path: '', component: NewsfeedComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'wissen', component: WissenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
