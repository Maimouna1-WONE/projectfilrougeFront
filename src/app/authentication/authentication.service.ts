import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';
// @ts-ignore
import { JwtHelperService } from '@auth0/angular-jwt';
// @ts-ignore
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService
{
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  infoUser: User;
  private decode = new JwtHelperService();

  constructor(private http: HttpClient, private userService: UserService)
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
          localStorage.setItem('currentUser', JSON.stringify(token));
          const tokenInfo = this.getInfoToken(token['token']);
          localStorage.setItem('currentUserInfo', JSON.stringify(tokenInfo));
          this.currentUserSubject.next(token);
          return tokenInfo.roles[0];
        })
      );
  }

  // tslint:disable-next-line:typedef
  logout()
  {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserInfo');
    this.currentUserSubject.next(null);
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
}
