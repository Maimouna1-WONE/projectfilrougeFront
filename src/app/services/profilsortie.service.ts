import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProfilSortie} from '../models/ProfilSortie';
import {Observable} from 'rxjs';
import {Profil} from '../models/profil';

@Injectable({
  providedIn: 'root'
})
export class ProfilsortieService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})};
  getAll(num: number): Observable<ProfilSortie[]>
  {
    // @ts-ignore
    return this.http.get<ProfilSortie[]>(`/api/admin/profilssorties?archive=false&page=${num + 1}`);
  }
  getbyId(id: number): Observable<ProfilSortie>
  {
    return this.http.get<ProfilSortie>(`/api/admin/profilssorties/${id}`);
  }
  // tslint:disable-next-line:typedef
  deleteOneProfilsortie(id: number)
  {
    return this.http.delete(`/api/admin/profilssorties/${id}`);
  }
  addProfilsortie(data: FormData): Observable<ProfilSortie[]>
  {
    // @ts-ignore
    return this.http.post('/api/admin/profilsortie', data);
  }
  // tslint:disable-next-line:typedef
  updateOneProfilsortie(id: number, data: object)
  {
    // @ts-ignore
    return this.http.put(`/api/admin/profilssorties/${id}`, data);
  }
}
