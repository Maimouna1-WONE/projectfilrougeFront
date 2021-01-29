import { Component, OnInit } from '@angular/core';
import {PromoService} from '../../../services/promo.service';
import {ActivatedRoute, Data} from '@angular/router';
import {Promo} from '../../../models/promo';

@Component({
  selector: 'app-formateurpromo',
  templateUrl: './formateurpromo.component.html',
  styleUrls: ['./formateurpromo.component.css']
})
export class FormateurpromoComponent implements OnInit {
  formateurs: Promo[];
  constructor(private promoservice: PromoService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
    (data: Data) => {
      this.formateurs = data.formpromo.formateurs;
    }
  );
  }

}
