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
import {ParametreComponent} from './home/parametre/parametre.component';
import {GrpcompetenceComponent} from './home/parametre/grpcompetence/grpcompetence.component';
import {CompetenceComponent} from './home/parametre/competence/competence.component';
import {GrptagComponent} from './home/parametre/grptag/grptag.component';
import {ProfilsortieComponent} from './home/parametre/profilsortie/profilsortie.component';
import {NotfoundComponent} from '../../notfound/notfound.component';
import {UpdateuserComponent} from './home/user/utilisateur/updateuser/updateuser.component';
import {DetailprofilComponent} from './home/user/profil/detailprofil/detailprofil.component';
import {AddprofilsortieComponent} from './home/parametre/profilsortie/addprofilsortie/addprofilsortie.component';
import {AddpromoComponent} from './home/parametre/promo/addpromo/addpromo.component';
import {NiveauComponent} from './home/parametre/competence/niveau/niveau.component';
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

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'cm', component: CmComponent, canActivate: [AuthGuard]},
  {path: 'formateur', component: FormateurComponent, canActivate: [AuthGuard]},
  {path: 'apprenant', component: ApprenantComponent, canActivate: [AuthGuard]},
  {path: 'referentiel', component: ReferentielComponent, canActivate: [AuthGuard]},
  {path: 'addpromo', component: AddpromoComponent, canActivate: [AuthGuard]},
  {path: 'addprofil', component: AddprofilComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard], children:
      [
        {path: 'parametre', component: ProfilsortieComponent, canActivate: [AuthGuard]},
        {path: 'promo', component: PromoComponent, canActivate: [AuthGuard], children:
            [
              {path: 'addpromo', component: AddpromoComponent, canActivate: [AuthGuard]}
            ]
        },
        {path: 'referentiel', component: ReferentielComponent, canActivate: [AuthGuard], children:
            [
              {path: 'updatereferentiel/:id', component: UpdatereferentielComponent, canActivate: [AuthGuard]},
              {path: 'referentielitem', component: ReferentielitemComponent, canActivate: [AuthGuard]}
            ]
        },
        {path: 'addreferentiel', component: AddreferentielComponent, canActivate: [AuthGuard]},
        {path: 'grpcompetence', component: GrpcompetenceComponent, canActivate: [AuthGuard], children:
            [
              {path: 'grpcompetenceitem', component: GrpcompetenceitemComponent, canActivate: [AuthGuard]},
              {path: 'updategrpcompetence/:1', component: UpdategrpcompetenceComponent, canActivate: [AuthGuard]}
            ]
        },
        {path: 'addgrpcompetence', component: AddgrpcompetenceComponent, canActivate: [AuthGuard]},
        {path: 'competence', component: CompetenceComponent, canActivate: [AuthGuard], children:
            [
              // tslint:disable-next-line:max-line-length
              {path: ':id/niveau', component: NiveauComponent, canActivate: [AuthGuard], resolve: {Competence: CompetenceResolverService}},
            ]
        },
        {path: 'addcompetence', component: AddcompetenceComponent, canActivate: [AuthGuard]},
        {path: 'grptag', component: GrptagComponent, canActivate: [AuthGuard]},
        {path: 'profilsortie', component: ProfilsortieComponent, canActivate: [AuthGuard], children:
            [
              {path: 'addprofilsortie', component: AddprofilsortieComponent, canActivate: [AuthGuard]},
            ]
        },
        {path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuard], children:
            [
              // tslint:disable-next-line:max-line-length
              {path: 'apprenantpromo/:id', component: ApprenantpromoComponent, canActivate: [AuthGuard], resolve: {apppromo: PromoApprenantResolverService}},
              // tslint:disable-next-line:max-line-length
              {path: 'apprenantprofilsortiepromo/:id', component: ApprenantprofilsortiepromoComponent, canActivate: [AuthGuard], resolve: {appprofilsortie: PromoApprenantprofilsortieResolverService}},
              // tslint:disable-next-line:max-line-length
              {path: 'apprenantpromoprofilsortie/:id/profilsortie/:id1', component: ApprenantpromoprofilsortieComponent, canActivate: [AuthGuard], resolve: {apppromoprofilsortie: PromoApprenantpromoprofilsortieResolverService}},
              // tslint:disable-next-line:max-line-length
              {path: 'formateurpromo/:id', component: FormateurpromoComponent, canActivate: [AuthGuard], resolve: {formpromo: PromoFormateurResolverService}},
              {path: 'infopromo', component: InfopromoComponent, canActivate: [AuthGuard]},
              {path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard]},
            ]
        },
        // tslint:disable-next-line:max-line-length
        {path: 'detailreferentiel/:id', component: DetailreferentielComponent, canActivate: [AuthGuard], resolve: {referentiel: ReferentielResolverService}, children:
            [
              {path: 'updatereferentiel', component: UpdatereferentielComponent, canActivate: [AuthGuard]},
            ]
        },
        {path: 'explore', component: ExploreComponent, canActivate: [AuthGuard]},
        {path: 'forum', component: ForumComponent, canActivate: [AuthGuard]},
        {path: 'rendu', component: RenduComponent, canActivate: [AuthGuard]},
        {path: 'brief', component: BriefComponent, canActivate: [AuthGuard]},
        {path: 'user', component: UtilisateurComponent, canActivate: [AuthGuard]},
        {path: 'adduser', component: AdduserComponent, canActivate: [AuthGuard]},
        {path: 'updateuser/:id', component: UpdateuserComponent, canActivate: [AuthGuard], resolve: {user: UserResolverService}},
        {path: 'utilisateur', component: UtilisateurComponent, canActivate: [AuthGuard], children:
            [
              {path: 'detailuser/:id', component: DetailuserComponent, canActivate: [AuthGuard], resolve: {user: UserResolverService}}
            ]
        },
        {path: 'profil', component: ProfilComponent, canActivate: [AuthGuard], children:
            [
              {path: 'addprofil', component: AddprofilComponent, canActivate: [AuthGuard]},
              {path: ':id/users', component: DetailprofilComponent, canActivate: [AuthGuard], resolve: {users: ProfilResolverService}}
            ]
        }
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
