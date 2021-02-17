import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promo} from '../models/promo';
import {Profil} from '../models/profil';
import {Competence} from '../models/competence';

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
  // tslint:disable-next-line:typedef
  addPromo(data: FormData)
  {
    // @ts-ignore
    return this.http.post('/api/admin/promos', data);
  }
  getApprenant(): Observable<Promo[]>
  {
    return this.http.get<Promo[]>(`/api/admin/promos/principal`);
  }
  getApprenantAttente(id: number): Observable<Promo[]>
  {
    return this.http.get<Promo[]>(`/api/admin/promos/${id}/principal`);
  }
  getApprenantprofilsortie(id: number): Observable<Promo[]>
  {
    return this.http.get<Promo[]>(`/api/admin/promos/${id}/profilsorties`);
  }
  getApprenantprofilsortiepromo(id: number, id1: number): Observable<Promo[]>
  {
    return this.http.get<Promo[]>(`/api/admin/promos/${id}/profilsorties/${id1}`);
  }
  getFormateur(id: number): Observable<Promo[]>
  {
    return this.http.get<Promo[]>(`/api/admin/promos/${id}/formateurs`);
  }
  getReferentiel(id: number): Observable<Promo[]>
  {
    return this.http.get<Promo[]>(`/api/admin/promos/${id}/referentiels`);
  }
  // tslint:disable-next-line:typedef
  getAttente()
  {
    return this.http.get(`/api/admin/promos/apprenants/attente`);
  }
  // tslint:disable-next-line:typedef
  getProfilsortie()
  {
    return this.http.get(`/api/admin/profilssorties`);
  }
  getPromobyId(id: number): Observable<Promo>
  {
    return this.http.get<Promo>(`/api/admin/promos/${id}`);
  }
  getPromoencours(): Observable<Promo[]>
  {
    return this.http.get<Promo[]>(`/api/admin/promos/encours`);
  }
}
