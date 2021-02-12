import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Competence} from '../models/competence';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http: HttpClient) { }
  getAllcompetence(): Observable<Competence[]>
  {
    return this.http.get<Competence[]>(`/api/admin/competences?archive=false`);
  }
  getcompetencebyId(id: number): Observable<Competence>
  {
    return this.http.get<Competence>(`/api/admin/competences/${id}`);
  }
  addCompetence(data: Object): Observable<Competence>
  {
    // @ts-ignore
    return this.http.post<Competence>('/api/admin/competences', data);
  }
  // tslint:disable-next-line:typedef
  deleteOneCompetence(id: number)
  {
    return this.http.delete(`/api/admin/competences/${id}`);
  }
  UpdateCompetence(id: number, data: Object): Observable<Competence>
  {
    // @ts-ignore
    return this.http.put<Competence>(`/api/admin/competences/${id}`, data);
  }
}
