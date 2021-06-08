import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SoundlistComponent } from './components/soundlist/soundlist.component';
import { ContactComponent } from './components/contact/contact.component';
import { SoundaddComponent } from './components/soundadd/soundadd.component';
import { SoundeditComponent } from './components/soundedit/soundedit.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'soundlist', component: SoundlistComponent},
  { path: 'add', component: SoundaddComponent},
  { path: 'edit', component: SoundeditComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'edit', component: SoundeditComponent},
  { path: 'account', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
