import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SoundlistComponent } from './components/soundlist/soundlist.component';
import { ContactComponent } from './components/contact/contact.component';
import { SoundaddComponent } from './components/soundadd/soundadd.component';
import { SoundeditComponent } from './components/soundedit/soundedit.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'soundlist', component: SoundlistComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'add', component: SoundaddComponent},
  { path: 'edit', component: SoundeditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
