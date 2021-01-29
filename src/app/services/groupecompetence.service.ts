import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Groupecompetence} from '../models/groupecompetence';
import {Competence} from '../models/competence';

@Injectable({
  providedIn: 'root'
})
export class GroupecompetenceService {

  constructor(private http: HttpClient) { }
  getAllgrpcompetence(): Observable<Groupecompetence[]>
  {
    return this.http.get<Groupecompetence[]>(`/api/admin/groupecompetences?archive=false`);
  }
  getcompetenceforGrpcompetence(id: number): Observable<Groupecompetence[]>
  {
    return this.http.get<Groupecompetence[]>(`/api/admin/groupecompetences/${id}/competences`);
  }
  // tslint:disable-next-line:typedef
  deleteOnegrpcomp(id: number)
  {
    return this.http.delete(`/api/admin/groupecompetences/${id}`);
  }
  // tslint:disable-next-line:typedef
  addGrpCompetence(data: Object)
  {
    // @ts-ignore
    return this.http.post('/api/admin/groupecompetences', data);
  }
}
