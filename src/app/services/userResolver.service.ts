import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User>{

  constructor(private userservice: UserService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<User> | Promise<User> | User {
    return this.userservice.getbyId(+route.params.id);
  }

}
