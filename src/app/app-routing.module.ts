import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './_helpers/auth.guard';
import {ApprenantComponent} from './apprenant/apprenant.component';
import {CmComponent} from './cm/cm.component';
import {FormateurComponent} from './formateur/formateur.component';
import {ProfilComponent} from './home/user/profil/profil.component';
import {AddprofilComponent} from './home/user/profil/addprofil/addprofil.component';
import {AdduserComponent} from './home/user/utilisateur/adduser/adduser.component';
import {PromoComponent} from './home/parametre/promo/promo.component';
import {DetailuserComponent} from './home/user/utilisateur/detailuser/detailuser.component';
import {UtilisateurComponent} from './home/user/utilisateur/utilisateur.component';
import {BriefComponent} from './home/brief/brief.component';
import {RenduComponent} from './home/rendu/rendu.component';
import {GrpcompetenceComponent} from './home/parametre/grpcompetence/grpcompetence.component';
import {CompetenceComponent} from './home/parametre/competence/competence.component';
import {GrptagComponent} from './home/parametre/grptag/grptag.component';
import {ProfilsortieComponent} from './home/parametre/profilsortie/profilsortie.component';
import {NotfoundComponent} from '../../notfound/notfound.component';
import {UpdateuserComponent} from './home/user/utilisateur/updateuser/updateuser.component';
import {DetailprofilComponent} from './home/user/profil/detailprofil/detailprofil.component';
import {AddprofilsortieComponent} from './home/parametre/profilsortie/addprofilsortie/addprofilsortie.component';
import {AddpromoComponent} from './home/parametre/promo/addpromo/addpromo.component';
import {GrpcompetenceitemComponent} from './home/parametre/grpcompetence/grpcompetenceitem/grpcompetenceitem.component';
import {AddgrpcompetenceComponent} from './home/parametre/grpcompetence/addgrpcompetence/addgrpcompetence.component';
import {UpdategrpcompetenceComponent} from './home/parametre/grpcompetence/updategrpcompetence/updategrpcompetence.component';
import {AddcompetenceComponent} from './home/parametre/competence/addcompetence/addcompetence.component';
import {AddreferentielComponent} from './home/parametre/referentiel/addreferentiel/addreferentiel.component';
import {ReferentielitemComponent} from './home/parametre/referentiel/referentielitem/referentielitem.component';
import {ReferentielComponent} from './home/parametre/referentiel/referentiel.component';
import {UpdatereferentielComponent} from './home/parametre/referentiel/updatereferentiel/updatereferentiel.component';
import {ExploreComponent} from './home/explore/explore.component';
import {ForumComponent} from './home/forum/forum.component';
import {HistoriqueComponent} from './home/historique/historique.component';
import {UserResolverService} from './services/userResolver.service';
import {ProfilResolverService} from './services/profilResolver.service';
import {CompetenceResolverService} from './services/competenceResolver.service';
import {ApprenantpromoComponent} from './home/historique/apprenantpromo/apprenantpromo.component';
import {FormateurpromoComponent} from './home/historique/formateurpromo/formateurpromo.component';
import {InfopromoComponent} from './home/historique/infopromo/infopromo.component';
import {PromoApprenantResolverService} from './services/promoApprenantResolver.service';
import {PromoFormateurResolverService} from './services/promoFormateurResolver.service';
import {PrincipalComponent} from './home/historique/principal/principal.component';
import {DetailreferentielComponent} from './home/historique/detailreferentiel/detailreferentiel.component';
import {ReferentielResolverService} from './services/ReferentielResolver.service';
import {ApprenantprofilsortiepromoComponent} from './home/historique/apprenantprofilsortiepromo/apprenantprofilsortiepromo.component';
import {PromoApprenantprofilsortieResolverService} from './services/promoApprenantprofilsortieResolver.service';
import {ApprenantpromoprofilsortieComponent} from './home/historique/apprenantpromoprofilsortie/apprenantpromoprofilsortie.component';
import {PromoApprenantpromoprofilsortieResolverService} from './services/promoApprenantpromoprofilsortieResolver.service';
import {groupecompetenceResolverService} from './services/groupecompetenceResolver.service';
import {UpdatecompetenceComponent} from './home/parametre/competence/updatecompetence/updatecompetence.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'cm', component: CmComponent, canActivate: [AuthGuard]},
  {path: 'formateur', component: FormateurComponent, canActivate: [AuthGuard]},
  {path: 'apprenant', component: ApprenantComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {breadcrumb: 'Home'}, children:
      [
        {path: 'parametre', component: ProfilsortieComponent, data: {breadcrumb: 'parametre'}, canActivate: [AuthGuard]},
        {path: 'promo', component: PromoComponent, data: {breadcrumb: 'promo'}, canActivate: [AuthGuard], children:
            [
              {path: 'addpromo', component: AddpromoComponent, data: {breadcrumb: 'addpromo'}, canActivate: [AuthGuard]}
            ]
        },
        {path: 'referentiel', component: ReferentielComponent, data: {breadcrumb: 'referentiel'}, canActivate: [AuthGuard], children:
            [
              // tslint:disable-next-line:max-line-length
              {path: 'referentielitem', component: ReferentielitemComponent, data: {breadcrumb: 'referentielitem'}, canActivate: [AuthGuard]}
            ]
        },
        // tslint:disable-next-line:max-line-length
        {path: 'updatereferentiel/:id', component: UpdatereferentielComponent, data: {breadcrumb: ''}, canActivate: [AuthGuard], resolve: {referentiel: ReferentielResolverService}},
        {path: 'addreferentiel', component: AddreferentielComponent, data: {breadcrumb: 'addreferentiel'}, canActivate: [AuthGuard]},
        {path: 'grpcompetence', component: GrpcompetenceComponent, data: {breadcrumb: 'grpcompetence'}, canActivate: [AuthGuard], children:
            [
              // tslint:disable-next-line:max-line-length
              {path: 'grpcompetenceitem', component: GrpcompetenceitemComponent, data: {breadcrumb: 'grpcompetenceitem'}, canActivate: [AuthGuard]},
            ]
        },
        // tslint:disable-next-line:max-line-length
        {path: 'updategrpcompetence/:id', component: UpdategrpcompetenceComponent, data: {breadcrumb: ''}, canActivate: [AuthGuard], resolve: {grpCompetence: groupecompetenceResolverService}},
        {path: 'addgrpcompetence', component: AddgrpcompetenceComponent, data: {breadcrumb: 'addgrpcompetence'}, canActivate: [AuthGuard]},
        {path: 'competence', component: CompetenceComponent, canActivate: [AuthGuard], data: {breadcrumb: 'competence'}},
        // tslint:disable-next-line:max-line-length
        {path: 'updatecompetence/:id', component: UpdatecompetenceComponent, data: {breadcrumb: ''}, canActivate: [AuthGuard], resolve: {competenceupdate: CompetenceResolverService}},
        {path: 'addcompetence', component: AddcompetenceComponent, data: {breadcrumb: 'addcompetence'}, canActivate: [AuthGuard]},
        {path: 'grptag', component: GrptagComponent, data: {breadcrumb: 'grptag'}, canActivate: [AuthGuard]},
        {path: 'profilsortie', component: ProfilsortieComponent, data: {breadcrumb: 'profilsortie'}, canActivate: [AuthGuard], children:
            [
              // tslint:disable-next-line:max-line-length
              {path: 'addprofilsortie', component: AddprofilsortieComponent, data: {breadcrumb: 'addprofilsortie'}, canActivate: [AuthGuard]},
            ]
        },
        {path: 'historique', component: HistoriqueComponent, data: {breadcrumb: 'historique'}, canActivate: [AuthGuard], children:
            [
              // tslint:disable-next-line:max-line-length
              {path: 'apprenantpromo/:id', component: ApprenantpromoComponent, data: {breadcrumb: ''}, canActivate: [AuthGuard], resolve: {apppromo: PromoApprenantResolverService}},
              // tslint:disable-next-line:max-line-length
              {path: 'apprenantprofilsortiepromo/:id', component: ApprenantprofilsortiepromoComponent, data: {breadcrumb: ''}, canActivate: [AuthGuard], resolve: {appprofilsortie: PromoApprenantprofilsortieResolverService}},
              // tslint:disable-next-line:max-line-length
              {path: 'apprenantpromoprofilsortie/:id/profilsortie/:id1', component: ApprenantpromoprofilsortieComponent, data: {breadcrumb: 'promops'}, canActivate: [AuthGuard], resolve: {apppromoprofilsortie: PromoApprenantpromoprofilsortieResolverService}},
              // tslint:disable-next-line:max-line-length
              {path: 'formateurpromo/:id', component: FormateurpromoComponent, data: {breadcrumb: ''}, canActivate: [AuthGuard], resolve: {formpromo: PromoFormateurResolverService}},
              {path: 'infopromo', component: InfopromoComponent, data: {breadcrumb: 'infopromo'}, canActivate: [AuthGuard]},
              {path: 'principal', component: PrincipalComponent, data: {breadcrumb: 'principal'}, canActivate: [AuthGuard]},
            ]
        },
        // tslint:disable-next-line:max-line-length
        {path: 'detailreferentiel/:id', component: DetailreferentielComponent, data: {breadcrumb: ''}, canActivate: [AuthGuard], resolve: {referentiel: ReferentielResolverService}, children:
            [
              // tslint:disable-next-line:max-line-length
              {path: 'updatereferentiel', component: UpdatereferentielComponent, data: {breadcrumb: 'updatereferentiel'}, canActivate: [AuthGuard]},
            ]
        },
        {path: 'explore', component: ExploreComponent, data: {breadcrumb: 'explore'}, canActivate: [AuthGuard]},
        {path: 'forum', component: ForumComponent, data: {breadcrumb: 'forum'}, canActivate: [AuthGuard]},
        {path: 'rendu', component: RenduComponent, data: {breadcrumb: 'rendu'}, canActivate: [AuthGuard]},
        {path: 'brief', component: BriefComponent, data: {breadcrumb: 'brief'}, canActivate: [AuthGuard]},
        {path: 'user', component: UtilisateurComponent, data: {breadcrumb: 'user'}, canActivate: [AuthGuard]},
        {path: 'adduser', component: AdduserComponent, data: {breadcrumb: 'adduser'}, canActivate: [AuthGuard]},
        // tslint:disable-next-line:max-line-length
        {path: 'updateuser/:id', component: UpdateuserComponent, data: {breadcrumb: ''}, canActivate: [AuthGuard], resolve: {user: UserResolverService}},
        // tslint:disable-next-line:max-line-length
        {path: 'utilisateur', component: UtilisateurComponent, data: {breadcrumb: 'utilisateur'}, canActivate: [AuthGuard], children:
            [
              // tslint:disable-next-line:max-line-length
              {path: 'detailuser/:id', component: DetailuserComponent, data: {breadcrumb: 'detail'}, canActivate: [AuthGuard], resolve: {user: UserResolverService}}
            ]
        },
        {path: 'profil', component: ProfilComponent, data: {breadcrumb: 'profil'}, canActivate: [AuthGuard], children:
            [
              {path: 'addprofil', component: AddprofilComponent, data: {breadcrumb: 'addprofil'}, canActivate: [AuthGuard]},
              ]
        },
        // tslint:disable-next-line:max-line-length
        {path: ':id/users', component: DetailprofilComponent, canActivate: [AuthGuard], data: {breadcrumb: 'users'}, resolve: {users: ProfilResolverService}}
      ]
  },
  {path: 'login_check', component: AuthenticationComponent},
  { path: 'not-found', component: NotfoundComponent },
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
