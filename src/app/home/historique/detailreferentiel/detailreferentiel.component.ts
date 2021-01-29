import { Component, OnInit } from '@angular/core';
import {Referentiel} from '../../../models/referentiel';
import {Promo} from '../../../models/promo';
import {ReferentielService} from '../../../services/referentiel.service';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-detailreferentiel',
  templateUrl: './detailreferentiel.component.html',
  styleUrls: ['./detailreferentiel.component.css']
})
export class DetailreferentielComponent implements OnInit {
referentiel: Referentiel;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.referentiel = data.referentiel['referentiel'];
        console.log(this.referentiel);
      }
    );
  }
}
