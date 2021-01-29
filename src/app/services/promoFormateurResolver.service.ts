import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Promo} from '../models/promo';
import {PromoService} from './promo.service';

@Injectable({
  providedIn: 'root'
})
export class PromoFormateurResolverService implements Resolve<Promo>{

  constructor(private promoservice: PromoService) {}

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Promo[]> | Promise<Promo[]> | Promo[] {
    return this.promoservice.getFormateur(+route.params.id);
  }

}
