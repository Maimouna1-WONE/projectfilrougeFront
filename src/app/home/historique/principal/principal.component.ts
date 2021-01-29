import { Component, OnInit } from '@angular/core';
import {PromoService} from '../../../services/promo.service';
import {Promo} from '../../../models/promo';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  principal: Promo[];
  groupes: []; formateur: [];
  constructor(private promoservice: PromoService) { }

  ngOnInit(): void {
    this.getApprenant();
  }
  // tslint:disable-next-line:typedef
  getApprenant(){
    this.promoservice.getApprenant().subscribe(
      res => {
        this.principal = res;
        //console.log(res[0]['groupes'][0]['apprenants'][0].nom);
      },
      error => {
        console.log(error);
      }
    );
  }
}
