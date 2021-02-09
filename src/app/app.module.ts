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
import { ProfilComponent } from './home/user/profil/profil.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddprofilComponent } from './home/user/profil/addprofil/addprofil.component';
import { AdduserComponent } from './home/user/utilisateur/adduser/adduser.component';
import {materialModule} from './design/material.module';
import { PromoComponent } from './home/parametre/promo/promo.component';
import { DetailuserComponent } from './home/user/utilisateur/detailuser/detailuser.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { UserComponent } from './home/user/user.component';
import { UtilisateurComponent } from './home/user/utilisateur/utilisateur.component';
import { BriefComponent } from './home/brief/brief.component';
import { RenduComponent } from './home/rendu/rendu.component';
import { ParametreComponent } from './home/parametre/parametre.component';
import { ProfilsortieComponent } from './home/parametre/profilsortie/profilsortie.component';
import { GrptagComponent } from './home/parametre/grptag/grptag.component';
import { CompetenceComponent } from './home/parametre/competence/competence.component';
import { GrpcompetenceComponent } from './home/parametre/grpcompetence/grpcompetence.component';
import {NotfoundComponent} from '../../notfound/notfound.component';
import { UpdateuserComponent } from './home/user/utilisateur/updateuser/updateuser.component';
import { DetailprofilComponent } from './home/user/profil/detailprofil/detailprofil.component';
import {AddprofilsortieComponent} from './home/parametre/profilsortie/addprofilsortie/addprofilsortie.component';
import {AddpromoComponent} from './home/parametre/promo/addpromo/addpromo.component';
import { NiveauComponent } from './home/parametre/competence/niveau/niveau.component';
import { GrpcompetenceitemComponent } from './home/parametre/grpcompetence/grpcompetenceitem/grpcompetenceitem.component';
import { AddgrpcompetenceComponent } from './home/parametre/grpcompetence/addgrpcompetence/addgrpcompetence.component';
import { UpdategrpcompetenceComponent } from './home/parametre/grpcompetence/updategrpcompetence/updategrpcompetence.component';
import { AddcompetenceComponent } from './home/parametre/competence/addcompetence/addcompetence.component';
import { AddreferentielComponent } from './home/parametre/referentiel/addreferentiel/addreferentiel.component';
import { ReferentielitemComponent } from './home/parametre/referentiel/referentielitem/referentielitem.component';
import {ReferentielComponent} from './home/parametre/referentiel/referentiel.component';
import { UpdatereferentielComponent } from './home/parametre/referentiel/updatereferentiel/updatereferentiel.component';
import { ExploreComponent } from './home/explore/explore.component';
import { ForumComponent } from './home/forum/forum.component';
import { HistoriqueComponent } from './home/historique/historique.component';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import { DataTablesModule } from 'angular-datatables';
import {QRCodeModule} from 'angularx-qrcode';
import {AccordionModule} from 'primeng/accordion';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import { ApprenantpromoComponent } from './home/historique/apprenantpromo/apprenantpromo.component';
import { FormateurpromoComponent } from './home/historique/formateurpromo/formateurpromo.component';
import { InfopromoComponent } from './home/historique/infopromo/infopromo.component';
import { PrincipalComponent } from './home/historique/principal/principal.component';
import { DetailreferentielComponent } from './home/historique/detailreferentiel/detailreferentiel.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { ApprenantprofilsortiepromoComponent } from './home/historique/apprenantprofilsortiepromo/apprenantprofilsortiepromo.component';
import { ApprenantpromoprofilsortieComponent } from './home/historique/apprenantpromoprofilsortie/apprenantpromoprofilsortie.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

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
    DetailuserComponent,
    AddpromoComponent,
    UserComponent,
    UtilisateurComponent,
    BriefComponent,
    RenduComponent,
    ParametreComponent,
    ProfilsortieComponent,
    GrptagComponent,
    CompetenceComponent,
    GrpcompetenceComponent,
    NotfoundComponent,
    UpdateuserComponent,
    DetailprofilComponent,
    AddprofilsortieComponent,
    NiveauComponent,
    GrpcompetenceitemComponent,
    AddgrpcompetenceComponent,
    UpdategrpcompetenceComponent,
    AddcompetenceComponent,
    AddreferentielComponent,
    ReferentielitemComponent,
    ReferentielComponent,
    UpdatereferentielComponent,
    ExploreComponent,
    ForumComponent,
    HistoriqueComponent,
    ApprenantpromoComponent,
    FormateurpromoComponent,
    InfopromoComponent,
    PrincipalComponent,
    DetailreferentielComponent,
    ApprenantprofilsortiepromoComponent,
    ApprenantpromoprofilsortieComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    materialModule,
    FlashMessagesModule.forRoot(),
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    MenubarModule,
    DataTablesModule,
    QRCodeModule,
    AccordionModule,
    CardModule,
    PdfViewerModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
