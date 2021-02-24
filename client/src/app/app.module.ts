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
import { SoundlistComponent } from './components/soundlist/soundlist.component';
import { LandingComponent } from './components/landing/landing.component';
import { SoundaddComponent } from './components/soundadd/soundadd.component';
import { SoundeditComponent } from './components/soundedit/soundedit.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SoundlistComponent,
    LandingComponent,
    SoundaddComponent,
    SoundeditComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // material modules
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatPaginatorModule,
  ],
  exports: [
    // material modules
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatPaginatorModule,
  ],
  entryComponents: [
    // put modals here
  ],
  providers: [
    // put guards here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
