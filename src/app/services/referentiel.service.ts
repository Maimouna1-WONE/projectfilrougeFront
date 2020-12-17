import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Referentiel} from '../models/referentiel';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  constructor(private http: HttpClient) { }
  getbyId(id: number): Observable<Referentiel>
  {
    return this.http.get<Referentiel>(`/api/admin/referentiels/${id}`);
  }
}
