import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Referentiel} from '../models/referentiel';
import {Profil} from '../models/profil';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  constructor(private http: HttpClient) { }
  getReferentiel(id: number): Observable<Referentiel>
  {
    return this.http.get<Referentiel>(`/api/admin/referentiels/${id}`);
  }
  getAllreferentiels(): Observable<Referentiel[]>
  {
    return this.http.get<Referentiel[]>(`/api/admin/referentiels?archive=false`);
  }
  addReferentiel(data: FormData): Observable<Referentiel>
  {
    // @ts-ignore
    return this.http.post('/api/admin/referentiels', data);
  }
  // tslint:disable-next-line:typedef
  deleteOneRef(id: number)
  {
    return this.http.delete(`/api/admin/referentiels/${id}`);
  }
  // tslint:disable-next-line:typedef
  updateOneReferentiel(id: number, data: FormData)
  {
    // @ts-ignore
    return this.http.post(`/api/admin/referentiels/${id}`, data);
  }
}
