import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {UserService} from './user.service';
import {Profil} from '../models/profil';
import {ProfilService} from './profil.service';
import {CompetenceService} from './competence.service';
import {Competence} from '../models/competence';

@Injectable({
  providedIn: 'root'
})
export class CompetenceResolverService implements Resolve<Profil>{

  constructor(private competenceservice: CompetenceService) {}

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Competence> | Promise<Competence> | Competence {
    // @ts-ignore
    return this.competenceservice.getcompetencebyId(+route.params.id);
  }

}
