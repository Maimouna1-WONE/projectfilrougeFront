import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './_helpers/auth.guard';
import {ApprenantComponent} from './apprenant/apprenant.component';
import {CmComponent} from './cm/cm.component';
import {FormateurComponent} from './formateur/formateur.component';
import {ProfilComponent} from './profil/profil.component';
import {AddprofilComponent} from './addprofil/addprofil.component';
import {AdduserComponent} from './adduser/adduser.component';
import {PromoComponent} from './promo/promo.component';
import {ReferentielComponent} from './referentiel/referentiel.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'cm', component: CmComponent, canActivate: [AuthGuard]},
  {path: 'formateur', component: FormateurComponent, canActivate: [AuthGuard]},
  {path: 'apprenant', component: ApprenantComponent, canActivate: [AuthGuard]},
  {path: 'referentiel', component: ReferentielComponent, canActivate: [AuthGuard]},
  {path: 'adduser', component: AdduserComponent, canActivate: [AuthGuard]},
  {path: 'addprofil', component: AddprofilComponent, canActivate: [AuthGuard]},
  {path: 'promo', component: PromoComponent, canActivate: [AuthGuard]},
  // {path: 'users/:id', component: DetailuserComponent, canActivate: [AuthGuard]},
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login_check', component: AuthenticationComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
