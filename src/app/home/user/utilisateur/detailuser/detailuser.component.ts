import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {User} from '../../../../models/user';
import {FlashMessagesService} from 'angular2-flash-messages';
import Swal from 'sweetalert2';

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
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
          this.user = data.user;
      }
    );
    this.myAngularxQrCode = JSON.stringify(this.user);
  }
}
