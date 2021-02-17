import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';
// @ts-ignore
import { JwtHelperService } from '@auth0/angular-jwt';
// @ts-ignore
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService
{
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  infoUser: User;
  private decode = new JwtHelperService();

  constructor(private http: HttpClient, private userService: UserService,
              private router: Router)
  {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  public get currentUserValue(): User
  {
    return this.currentUserSubject.value;
  }
  // tslint:disable-next-line:typedef
  login( username: string, password: string)
  {
    return this.http.post<any>(`/api/login_check`, { 'login' : username, 'password' : password })
      .pipe(map(token => {
        const tokenInfo = this.getInfoToken(token['token']);
        if (tokenInfo.archive === false) {
          localStorage.setItem('currentUser', JSON.stringify(token));
          localStorage.setItem('currentUserInfo', JSON.stringify(tokenInfo));
          /*const en = window.atob(password);
          console.log(en);*/
          localStorage.setItem('password', JSON.stringify(password));
          this.currentUserSubject.next(token);
          return tokenInfo.roles[0];
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Vous n\'etes pas autorisé à se connecter!'
          });
        }
        })
      );
  }

  // tslint:disable-next-line:typedef
  logout()
  {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserInfo');
    localStorage.removeItem('password');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login_check']);
  }

  getInfoToken(token: string): any
  {
    try
    {
      return this.decode.decodeToken(token);
    }
    catch ( Error )
    {
      return null;
    }
  }
  getbyLogin(): Observable<User>
  {
    return this.http.get<User>(`/api/admin/users/search`);
  }
}
