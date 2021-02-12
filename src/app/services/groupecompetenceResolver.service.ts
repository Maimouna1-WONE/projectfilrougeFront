import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Referentiel} from '../models/referentiel';
import {ReferentielService} from './referentiel.service';
import {Groupecompetence} from '../models/groupecompetence';
import {GroupecompetenceService} from './groupecompetence.service';

@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class groupecompetenceResolverService implements Resolve<Groupecompetence>{

  constructor(private grpcompetenceservice: GroupecompetenceService) {}

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Groupecompetence[]> | Promise<Groupecompetence[]> | Groupecompetence[] {
    // @ts-ignore
    return this.grpcompetenceservice.getGrpcompetence(+route.params.id);
  }

}
