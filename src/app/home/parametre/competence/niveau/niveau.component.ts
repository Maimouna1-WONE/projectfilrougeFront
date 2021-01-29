import {Component, Input, OnInit} from '@angular/core';
import {Referentiel} from '../../../../models/referentiel';
import {Competence} from '../../../../models/competence';
import {Groupecompetence} from '../../../../models/groupecompetence';
import {ActivatedRoute, Data} from '@angular/router';
import {Niveau} from '../../../../models/niveau';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.css']
})
export class NiveauComponent implements OnInit {
  competence: Competence;
  niveau: Niveau;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.competence = data.Competence;
      }
    );
  }
  // tslint:disable-next-line:typedef
  getniveau(i: number){
    // @ts-ignore
    const index = document.getElementById(i).getAttribute('id');
    this.niveau = this.competence.niveau[index];
  }

}
