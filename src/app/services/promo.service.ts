import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promo} from '../models/promo';
import {Profil} from '../models/profil';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})};
  getAll(num: number): Observable<Promo[]>
  {
    // @ts-ignore
    return this.http.get<Promo[]>(`/api/admin/promos?archive=false&page=${num + 1}`);
  }
  // tslint:disable-next-line:typedef
  deleteOnePromo(id: number)
  {
    return this.http.delete(`/api/admin/promos/${id}`);
  }
  addPromo(data: FormData): Observable<Promo[]>
  {
    // @ts-ignore
    return this.http.post('/api/admin/promos', data);
  }
  getApprenant(): Observable<Promo[]>
  {
    return this.http.get<Promo[]>(`/api/admin/promos/principal`);
  }
}
