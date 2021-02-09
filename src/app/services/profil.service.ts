import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Profil} from '../models/profil';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  // tslint:disable-next-line:typedef
  getAllprofils(num: number): Observable<Profil[]>
  {
    return this.http.get<Profil[]>(`/api/admin/profils?archive=false&page=${num + 1}`);
  }
  getprofils(): Observable<Profil[]>
  {
    return this.http.get<Profil[]>(`/api/admin/profils?archive=false`);
  }
  // @ts-ignore
  getUsersProfil(id: number): Observable<Profil[]>
  {
    return this.http.get<Profil[]>(`/api/admin/profils/${id}/users`);
  }
  // tslint:disable-next-line:typedef
  updateOneProfil(id: number, data: object)
  {
    // @ts-ignore
    return this.http.put(`/api/admin/profils/${id}`, data);
  }
  // tslint:disable-next-line:typedef
  deleteOneProfil(id: number)
  {
    return this.http.delete(`/api/admin/profils/${id}`);
  }
  addProfil(data: object): Observable<Profil[]>
  {
    // @ts-ignore
    return this.http.post<Profil>('/api/admin/profils', data);
  }
  getbyId(id: number): Observable<Profil>
  {
    return this.http.get<Profil>(`/api/admin/profils/${id}`);
  }
  // tslint:disable-next-line:typedef
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);

  }
}
