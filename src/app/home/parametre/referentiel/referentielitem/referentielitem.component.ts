import {Component, Input, OnInit} from '@angular/core';
import {Referentiel} from '../../../../models/referentiel';
import {ReferentielService} from '../../../../services/referentiel.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import 'jspdf-autotable';
import {SafeResourceUrl} from '@angular/platform-browser';
import Swal from 'sweetalert2';

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
  constructor(private referentielservice: ReferentielService) { }

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
  base64toBlob(base64Data, contentType = 'application/pdf') {
    contentType = contentType || '';
    // tslint:disable-next-line:prefer-const
    let sliceSize = 512;
    base64Data = base64Data.replace(/]+,/, '');
    base64Data = base64Data.replace(/\s/g, '');
    // tslint:disable-next-line:prefer-const
    let byteCharacters = window.atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  // tslint:disable-next-line:typedef
  openProgramme(){
    const file = this.base64toBlob(this.ref.programme);
    const fileUrl = URL.createObjectURL(file);
    window.open(fileUrl, '_blank');
  }
// tslint:disable-next-line:typedef
  deleteRef(ref: Referentiel){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.referentielservice.deleteOneRef(ref.id).subscribe();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
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
}
