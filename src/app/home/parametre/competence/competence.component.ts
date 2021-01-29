import { Component, OnInit } from '@angular/core';
import {GroupecompetenceService} from '../../../services/groupecompetence.service';
import {Groupecompetence} from '../../../models/groupecompetence';
import {Competence} from '../../../models/competence';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css']
})
export class CompetenceComponent implements OnInit {
  grpcompetences: Groupecompetence[];
  competences: Competence[];
  idgc: number;
  toppingsControl = new FormControl([]);
  constructor(private grpcompetenceservice: GroupecompetenceService) { }

  ngOnInit(): void {
    this.grpcompetenceservice.getAllgrpcompetence().subscribe(
      res => {
        this.grpcompetences = res;
      }
    );
  }
  // tslint:disable-next-line:typedef
  getgroupe(){
    this.idgc = this.toppingsControl.value;
    this.grpcompetenceservice.getcompetenceforGrpcompetence(this.idgc).subscribe(
      res => {
        this.competences = res['competence'];
      }
    );
  }

}
