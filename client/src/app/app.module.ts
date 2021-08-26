import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular material modules
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';

import { SoundlistComponent } from './components/soundlist/soundlist.component';
import { LandingComponent } from './components/landing/landing.component';
import { SoundaddComponent } from './components/soundadd/soundadd.component';
import { SoundeditComponent } from './components/soundedit/soundedit.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { ApplyComponent } from './components/apply/apply.component';
import { RegisterComponent } from './components/register/register.component';
import { WorkorderComponent } from './components/workorder/workorder.component';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { AccountComponent } from './components/account/account.component';
import { AdminMessagingComponent } from './components/admin-messaging/admin-messaging.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarmodalComponent } from './components/navbarmodal/navbarmodal.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FooterComponent } from './components/footer/footer.component';
import { SubmitdialogfileComponent } from './components/submitdialogfile/submitdialogfile.component';
import { ContactsubmissionlandingComponent } from './components/contactsubmissionlanding/contactsubmissionlanding.component';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { EnterPasswordFromEmailComponent } from './components/enter-password-from-email/enter-password-from-email.component';

@NgModule({
  declarations: [
    AppComponent,
    SoundlistComponent,
    LandingComponent,
    SoundaddComponent,
    SoundeditComponent,
    SearchComponent,
    NavbarComponent,
    ContactComponent,
    ApplyComponent,
    RegisterComponent,
    WorkorderComponent,
    LoginComponent,
    AuthComponent,
    AdminComponent,
    AccountComponent,
    AdminMessagingComponent,
    ProjectsComponent,
    AboutComponent,
    NavbarmodalComponent,
    CheckoutComponent,
    FooterComponent,
    SubmitdialogfileComponent,
    ContactsubmissionlandingComponent,
    AddnoteComponent,
    EnterPasswordFromEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // material modules
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatPaginatorModule, MatNativeDateModule
  ],
  exports: [
    // material modules
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatPaginatorModule, MatNativeDateModule
  ],
  entryComponents: [
    // put modals here
  ],
  providers: [
    // put guards here
    AudioContext,
    NavbarComponent,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
