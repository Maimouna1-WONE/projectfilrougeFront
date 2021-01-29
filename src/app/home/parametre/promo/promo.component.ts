import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {PromoService} from '../../../services/promo.service';
import {Promo} from '../../../models/promo';
import {Referentiel} from '../../../models/referentiel';
import {ReferentielService} from '../../../services/referentiel.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
