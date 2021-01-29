import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Referentiel} from '../models/referentiel';
import {ReferentielService} from './referentiel.service';
import {PromoService} from './promo.service';

@Injectable({
  providedIn: 'root'
})
export class ReferentielResolverService implements Resolve<Referentiel>{

  constructor(private promoservice: PromoService) {}

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Referentiel[]> | Promise<Referentiel[]> | Referentiel[] {
    // @ts-ignore
    return this.promoservice.getReferentiel(+route.params.id);
  }

}
