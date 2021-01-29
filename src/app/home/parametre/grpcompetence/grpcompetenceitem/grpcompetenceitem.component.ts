import {Component, Input, OnInit} from '@angular/core';
import {Groupecompetence} from '../../../../models/groupecompetence';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-grpcompetenceitem',
  templateUrl: './grpcompetenceitem.component.html',
  styleUrls: ['./grpcompetenceitem.component.css']
})
export class GrpcompetenceitemComponent implements OnInit {
@Input() grpcmp: Groupecompetence;
  constructor(private grpcompservice: GroupecompetenceService,
              private flashmessage: FlashMessagesService) { }

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
}
