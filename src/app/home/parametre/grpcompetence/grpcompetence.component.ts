import { Component, OnInit } from '@angular/core';
import {GroupecompetenceService} from '../../../services/groupecompetence.service';
import {Groupecompetence} from '../../../models/groupecompetence';

@Component({
  selector: 'app-grpcompetence',
  templateUrl: './grpcompetence.component.html',
  styleUrls: ['./grpcompetence.component.css']
})
export class GrpcompetenceComponent implements OnInit {
grpcompetences: Groupecompetence[];
  constructor(private grpcompetenceservice: GroupecompetenceService) { }

  ngOnInit(): void {
    this.grpcompetenceservice.getAllgrpcompetence().subscribe(
      res => {
        this.grpcompetences = res;
      },
      error => {
        console.log(error);
      }
    );
  }

}
