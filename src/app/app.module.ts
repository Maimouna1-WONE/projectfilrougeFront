import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {ErrorInterceptor } from './_helpers/error.interceptor';
import {JwtInterceptor } from './_helpers/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ApprenantComponent } from './apprenant/apprenant.component';
import { FormateurComponent } from './formateur/formateur.component';
import { CmComponent } from './cm/cm.component';
import { ProfilComponent } from './profil/profil.component';
import { NavbarComponent } from './navbar/navbar.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddprofilComponent } from './addprofil/addprofil.component';
import { AdduserComponent } from './adduser/adduser.component';
import {materialModule} from './design/material.module';
import { PromoComponent } from './promo/promo.component';
import { ReferentielComponent } from './referentiel/referentiel.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    ApprenantComponent,
    FormateurComponent,
    CmComponent,
    ProfilComponent,
    NavbarComponent,
    AddprofilComponent,
    AdduserComponent,
    PromoComponent,
    ReferentielComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    materialModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
