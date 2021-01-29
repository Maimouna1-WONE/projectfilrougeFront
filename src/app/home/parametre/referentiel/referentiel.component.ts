import { Component, OnInit } from '@angular/core';
import {ReferentielService} from '../../../services/referentiel.service';
import {PageEvent} from '@angular/material/paginator';
import {Referentiel} from '../../../models/referentiel';

@Component({
  selector: 'app-referentiel',
  templateUrl: './referentiel.component.html',
  styleUrls: ['./referentiel.component.css']
})
export class ReferentielComponent implements OnInit {
  referentiels: Referentiel[];
  constructor(private referentielservice: ReferentielService) { }

  ngOnInit(): void {
    this.referentielservice.getAllreferentiels().subscribe(
      res => {
        this.referentiels = res;
        // console.log(res);
      },
      error => console.log('erreur de recuperation referentiels')
    );
  }
}
