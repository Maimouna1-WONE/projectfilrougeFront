import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {UserService} from './user.service';
import {Profil} from '../models/profil';
import {ProfilService} from './profil.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilResolverService implements Resolve<Profil>{

  constructor(private profilservice: ProfilService) {}

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Profil[]> | Promise<Profil[]> | Profil[] {
    return this.profilservice.getUsersProfil(+route.params.id);
  }

}
