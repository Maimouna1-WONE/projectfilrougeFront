import {Component, Input, OnInit} from '@angular/core';
import {Groupecompetence} from '../../../../models/groupecompetence';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Competence} from '../../../../models/competence';

@Component({
  selector: 'app-grpcompetenceitem',
  templateUrl: './grpcompetenceitem.component.html',
  styleUrls: ['./grpcompetenceitem.component.css']
})
export class GrpcompetenceitemComponent implements OnInit {
@Input() grpcmp: Groupecompetence;
comp: Competence;
  constructor(private grpcompservice: GroupecompetenceService,
              private flashmessage: FlashMessagesService,
              private router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  deleteGrpComp(grpcmp: Groupecompetence){
    const res = confirm('Êtes-vous sûr de vouloir supprimer?');
    if (res) {
      this.grpcompservice.deleteOnegrpcomp(grpcmp.id).subscribe(
        res => {
          this.flashmessage.show('Suppression reussie', {cssClass: 'alert-success', timeout: 1000});
          window.location.reload();
        },
        error => {
          this.flashmessage.show('error', {cssClass: 'alert-danger', timeout: 1000});
        });
    }
  }
  // tslint:disable-next-line:typedef
  detail(grpcomp: Groupecompetence){
    this.grpcompservice.getGrpcompetence(grpcomp.id).subscribe(
      res => {
        this.comp = res.competence;
        console.log(this.comp.libelle);
      }
    );
    Swal.fire({
    title: 'Detail de la competence',
      html:
        '<b>Description</b>' + this.comp.description
  });
  }
}
