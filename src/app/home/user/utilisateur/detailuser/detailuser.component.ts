import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {User} from '../../../../models/user';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {DomSanitizer} from '@angular/platform-browser';
import {log} from 'util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css']
})
export class DetailuserComponent implements OnInit {

  user: User;
  id: number;
  qrcode: User;
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
          console.log(this.user);
      }
    );
    this.userservice.getQrcode(this.route.snapshot.params.id).subscribe(
      res => {
        this.qrcode = res;
        this.myAngularxQrCode = JSON.stringify(this.qrcode);
        console.log(this.qrcode);
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to refresh',
          icon: 'error',
          confirmButtonText: 'Yes'
        });
      }
    );
    const data = this.myAngularxQrCode;
    const blob = new Blob([data], { type: 'application/octet-stream' });
    // saves the text from qr
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  // tslint:disable-next-line:typedef
  /*createPdfdetail() {
    // tslint:disable-next-line:prefer-const
    let doc = new jsPDF.jsPDF();
    doc.html(document.getElementById('carte')).then(r => {
      doc.setFontSize(18);
      doc.text('Liste des Utilisateurs', 11, 8);
      doc.setFontSize(11);
      doc.setTextColor(100);
      const imgData = 'data:image/jpeg;base64,' + this.user.avatar;
      doc.addImage(imgData, 'png', 15, 40, 180, 160);
      doc.output('dataurlnewwindow');
      // below line for Download PDF document
      doc.save('autoprint.pdf');
    });
  }*/
}
