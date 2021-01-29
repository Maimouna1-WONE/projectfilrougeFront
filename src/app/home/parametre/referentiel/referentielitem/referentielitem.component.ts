import {Component, Input, OnInit} from '@angular/core';
import {Referentiel} from '../../../../models/referentiel';
import {ReferentielService} from '../../../../services/referentiel.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-referentielitem',
  templateUrl: './referentielitem.component.html',
  styleUrls: ['./referentielitem.component.css']
})
export class ReferentielitemComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('referentiel') ref: Referentiel;
  pdfSrc: any;
  private fileUrl: SafeResourceUrl;
  constructor(private referentielservice: ReferentielService,
              private flashmessage: FlashMessagesService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.pdfSrc = this._base64ToArrayBuffer(this.ref.programme);
  }
  // tslint:disable-next-line:typedef
  _base64ToArrayBuffer(base64Data) {
    // tslint:disable-next-line:variable-name
    const binary_string = window.atob(base64Data);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

// tslint:disable-next-line:typedef
  deleteRef(ref: Referentiel){
    const res = confirm('Êtes-vous sûr de vouloir supprimer?');
    if (res) {
      this.referentielservice.deleteOneRef(ref.id).subscribe(
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
  generatePDF(action = 'open') {

    const docDefinition = {
      header: 'C#Corner PDF Header',
      content: [
        {
          text: 'Order Details'
        },
        {
          columns: [
            [
              {
                text: 'Libelle: ' + this.ref.libelle,
                bold: true
              },
              { text: 'Critere d"Adminssion: ' + this.ref.critereAdmission },
              { text: 'Critere d"Evaluation: ' + this.ref.critereEvaluation }
            ]
          ]
        }
      ]
    };
    if (action === 'download'){
      pdfMake.createPdf(docDefinition).download();
    }else if (action === 'print'){
      pdfMake.createPdf(docDefinition).print();
    }else{
      pdfMake.createPdf(docDefinition).open();
    }

  }
  // tslint:disable-next-line:typedef
  createPdf() {
    // tslint:disable-next-line:prefer-const
    /*let doc = new jsPDF.jsPDF();
    doc.setFontSize(18);
    doc.text('My Team Detail', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    (doc as any).autoTable({
      html: '#programme'
    });
    doc.output('dataurlnewwindow');
    doc.save('myteamdetail.pdf');*/
  }
}
