import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {User} from '../../../../models/user';
import {FlashMessagesService} from 'angular2-flash-messages';
import Swal from 'sweetalert2';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css']
})
export class DetailuserComponent implements OnInit {

  user: User;
  id: number;
  myAngularxQrCode: string;
  fileUrl;
  constructor(private userservice: UserService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (data: Data) => {
          this.user = data.user;
      }
    );
    this.myAngularxQrCode = JSON.stringify(this.user);
    const data = this.myAngularxQrCode;
    const blob = new Blob([data], { type: 'application/octet-stream' });
    // saves the text from qr
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
}
