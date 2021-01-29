import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {User} from '../../../../models/user';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css']
})
export class DetailuserComponent implements OnInit {

  user: User;
  id: number;
  myAngularxQrCode: string;
  constructor(private userservice: UserService,
              private route: ActivatedRoute,
              private flashmessage: FlashMessagesService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
          this.user = data.user;
      }
    );
    this.myAngularxQrCode = JSON.stringify(this.user);
  }
  // tslint:disable-next-line:typedef
  delete(user: User) {
    const res = confirm('Êtes-vous sûr de vouloir supprimer?');
    if (res) {
      this.userservice.deleteOneUser(user.id).subscribe(
        res => {
          this.flashmessage.show('Suppression reussie', {cssClass: 'alert-success', timeout: 1000});
        },
        error => {
          this.flashmessage.show('error', {cssClass: 'alert-danger', timeout: 1000});
        });
    }
  }
}
